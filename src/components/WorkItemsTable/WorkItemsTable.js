import styles from './WorkItemsTable.module.css';
import {getColorState, getAvatar} from '../../lib/util';
import {BsFiles} from 'react-icons/bs';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as icons from '../../lib/icons';
import * as actions from '../../store/actions/workItems'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const WorkItemsTable = (props) => {

    const dispatch = useDispatch();

    useEffect( () => {
        console.log('useEffect 1');
        dispatch(actions.initWorkItemsFully());
    }, []);

    const workitems = useSelector((state) => state.workItem.workitems)

    const deleteWI = (name) => {
        console.log('to delete:'+name);
        dispatch(actions.deleteWorkItemFully(name));
    }

    console.log("EEEE", workitems);
    const iconComments = <BsFiles/>;
    let htmldata = workitems.map(d => {
        
        let commentaires = null;
        if (d.comments && d.comments.length>0){
            commentaires = [<BsFiles/>, <span key={d.comments.length} className={styles.margegauche}>{d.comments.length}</span>];
        }
        const icontypename = 'icon'+d.type;
        return [
            <div><input type="button" class="btn small" value="Delete" onClick={()=>deleteWI(d.name)}/></div>,
            <div>{d.id}</div>,
            <div className={styles.titleicon}>{icons[icontypename]} <NavLink to={`editwi/${d.name}`} className={styles.textW}>{d.title}</NavLink></div>,
            <div>
                <div className={styles.avatar} style={{'backgroundColor': d.assignto ? d.assignto.color: `#FFF`}}>{d.assignto && d.assignto.surname && getAvatar(d.assignto.surname)}</div>
                {d.assignto && d.assignto.surname}
            </div>,
            <div className={styles.cellcenter}>
                <div className={styles.bulle} style={{'backgroundColor': getColorState(d.state)}}></div>
                {d.state && (d.state.charAt(0).toUpperCase() + d.state.slice(1))}
            </div>,
            <div>{d.tags && d.tags.map((t,i)=><span key={i} className={styles.tag}>{t}</span>)}</div>,
            <div className={styles.cellcenter} onClick={()=> props.onWorkItemDeleted(d.id)}>{commentaires}</div>
        ];
    });

    return (
        <SimpleBar style={{ maxHeight: '70vh', width: '100%' }} >

            <div className={styles.grid}>
                <div></div>
                <div className={styles.header}>ID</div>
                <div className={styles.header}>Title</div>
                <div className={styles.header}>Assign to</div>
                <div className={styles.header}>State</div>
                <div className={styles.header}>Tags</div>
                <div className={styles.header}>Comments ={workitems.length}=</div>
                {htmldata}
            </div>
        </SimpleBar>
    );
}

/*const mapStateToProps = state => {
    return {
        workitems: state.workItem.workitems
    };
}*/
const mapDispatchToProps = dispatch => {
    return {
        onWorkItemDeleted: (id) => dispatch(actions.removeWorkItem(id))
    }
}
export default connect(null,mapDispatchToProps)(WorkItemsTable);