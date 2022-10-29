import './sprint.css';
import { getColorState, getAvatar, getUserObjFromId } from '../../lib/util';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWorkItemFully, updateWorkItemFully } from '../../store/actions/workItems'

const Box = ({workitem, mode, addNewTask}) => {
    
    const {name, title, type, state, assignto = {}, parentId} = workitem;
    const classnames = ['box', `box-${type}`].join(" ");

    const workitems = useSelector(state=>state.workItem.workitems);
    const dispatch = useDispatch();
    
    let idUser = 0;
    if ('id' in assignto) {
        idUser = assignto.id;
    }

    const titleRef = useRef(title);
    const assignToRef = useRef(idUser);
    const stateRef = useRef(state);

    const changeUser = (e) => {
        console.log('change user!', e.target.value);
        assignToRef.current = e.target.value;
        addOrUpdateTask();
    }
    const changeTitle = (e) => {
        console.log('change title!', e.target.value);
        titleRef.current = e.target.value;
        addOrUpdateTask();
    }
    const changeState = (e) => {
        console.log('change state!', e.target.value);
        stateRef.current = e.target.value;
        addOrUpdateTask();
    }
    const addOrUpdateTask = () => {
        if (mode === 'new') {
            addNewTask('');
            dispatch(addWorkItemFully({title: titleRef.current, parentId: parentId, assignto: getUserObjFromId(assignToRef.current), state: stateRef.current, type: 'task'}))
        }
        else {
            dispatch(updateWorkItemFully({name: name, title: titleRef.current, parentId: parentId, assignto: getUserObjFromId(assignToRef.current), state: stateRef.current, type: 'task'}))
        }
    }

    let dispayTitle = title;
    let displayState = state;
    let displayAssignTo = assignto && assignto.surname?assignto.surname:'';
    if (mode === 'new' || mode === 'edit') {
        dispayTitle = <input onBlur={changeTitle} type='text' name='title' placeholder='Please set a title' className='input-box' defaultValue={mode==='edit'?title:'new'}></input>;
        displayState = <select value={state} onChange={changeState} className='select-box' name='state'><option value='to do'>To Do</option><option value='in progress'>In Progress</option><option value='done'>Done</option></select>;

        displayAssignTo = <select value={idUser} onChange={changeUser} className='select-box' name='assignTo'>
            <option value=""></option>
            <option value="3">Stefanie Toute</option>
            <option value="1">John Doe</option>
            <option value="2">Paul Boo</option>
            </select>;
    }

    useEffect(()=> {
        console.log('Box au 1er chargement');
    }, []);


    return (
        <div className={classnames}>
            <div><strong></strong> {dispayTitle}</div>
            <div className='user_container'>
                <div className="avatar" style={{'backgroundColor': assignto ? assignto.color: `#FFF`}}>{assignto && assignto.surname && getAvatar(assignto.surname)}</div> 
                {displayAssignTo}
            </div>
            <div className='state_container'>
                State
                <div className='bulle_container'>
                    <div className="bulle" style={{'backgroundColor': getColorState(state)}}></div> 
                    {displayState}
                </div>
            </div>
        </div>
    );
}

export default Box;