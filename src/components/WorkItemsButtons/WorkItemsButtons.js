import Button from '../UI/Button/Button';

import { connect, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/workItems';
import * as icons from '../../lib/icons';
import FilterBar from '../FilterBar/FilterBar';
import { useEffect, useState } from 'react';
import styles from '../UI/Button/Button.module.css'
import {NavLink} from "react-router-dom";

const WorkItemsButtons = (props) => {

    const dispatch = useDispatch();
    const [isFilterOpen,setIsOpenFilterOpen] = useState(false);
    const typesMap = new Map();
    typesMap.set('bug', 'Bug');
    typesMap.set('epic', 'Epic');
    typesMap.set('feature', 'Feature');
    typesMap.set('productitem', 'Product Backlog Item');
    typesMap.set('support', 'Support');
    typesMap.set('task', 'Task');
    let selectTypes = [];

    for (let key of typesMap.keys()) {
        selectTypes.push(<div onClick={(e)=> {e.stopPropagation();props.onWorkItemFilterType(key)}}>{props.filtertypes.includes(key)?icons.iconcheckboxfull:icons.iconcheckboxempty}  {icons[`icon${key}`]} <span>{typesMap.get(key)}</span></div>);
    }

                    /*<div onClick={()=> dispatch(actions.addWorkItemFully('bug'))}>{icons.iconbug} <span>Bug</span></div>
                    <div onClick={()=> dispatch(actions.addWorkItemFully('epic'))}>{icons.iconepic} <span>Epic</span></div>
                    <div onClick={()=> dispatch(actions.addWorkItemFully('feature'))}>{icons.iconfeature} <span>Feature</span></div>
                    <div onClick={()=> dispatch(actions.addWorkItemFully('productitem'))}>{icons.iconproductitem} <span>Product Backlog Item</span></div>
                    <div onClick={()=> dispatch(actions.addWorkItemFully('support'))}>{icons.iconsupport} <span>Support</span></div>
                    <div onClick={()=> dispatch(actions.addWorkItemFully('task'))}>{icons.icontask} <span>Task</span></div>*/
    return [
        <div style={{display: 'flex', zIndex: 100, justifyContent: 'space-between', width: '100%', paddingBottom: '10px', borderBottom: '1px solid #313130'}}>
            <div style={{display: 'flex'}}>
                <Button icon={icons.iconplus} label="New Work Item" name="btnNewWorkItem">

                    <NavLink to="newwi/bug">{icons.iconbug} <span>Bug</span></NavLink>
                    <NavLink to="newwi/epic">{icons.iconepic} <span>Epic</span></NavLink>
                    <NavLink to="newwi/feature">{icons.iconfeature} <span>Feature</span></NavLink>
                    <NavLink to="newwi/productitem">{icons.iconproductitem} <span>Product Backlog Item</span></NavLink>
                    <NavLink to="newwi/support">{icons.iconsupport} <span>Support</span></NavLink>
                    <NavLink to="newwi/task">{icons.icontask} <span>Task</span></NavLink>
                </Button>
                <Button icon={icons.iconarrow} label="Open in Queries"></Button>
                <Button icon={icons.icontournevis} label="Column Options"></Button>
                <Button icon={icons.iconimport} label="Import Work Items"></Button>
            </div>
            <div style={{display: 'flex'}}>
                <Button type="small" icon={icons.iconsettings}></Button>
                <Button type="small" icon={icons.iconfilter} onClickEvent={setIsOpenFilterOpen}></Button>              
                <Button type="small" icon={icons.iconbigscreen}></Button>
            </div>
        </div>,
        isFilterOpen?<FilterBar>
<Button label="Types" name="btnFilterType">
    {selectTypes}
</Button>
<Button label="Assign To" name="btnFilterAssignTo">
        {[{id: 2, surname:'Paul Boo', color: '#027d00'},{id: 3, surname:'John Fer', color: '#001e51'}].map(user=>{
            return <div onClick={(e)=> {e.stopPropagation();props.onWorkItemFilterUser(user.id)}}>{props.filterusers.includes(user.id)?icons.iconcheckboxfull:icons.iconcheckboxempty} {icons.iconbug} <span>{user.surname}</span></div>
        })}
</Button>
<Button label="States" name="btnFilterState">


</Button>
<Button label="Tags" name="btnFilterTag">


</Button>
        </FilterBar>:null
    ];
}

const mapStateToProps = state => {
    return {
        filtertypes: state.workItem.filtertype,
        filterusers: state.workItem.filteruser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onWorkItemAdded: (type) => dispatch(actions.addWorkItem(type)),
        onWorkItemFilterType: (type) => dispatch(actions.filterTypeWorkItem(type)),
        onWorkItemFilterUser: (user) => dispatch(actions.filterUserWorkItem(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkItemsButtons);