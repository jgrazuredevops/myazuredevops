import './sprint.css';
import Box from './Box';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initWorkItemsFully } from '../../store/actions/workItems'
import ButtonAddTask from './ButtonAddTask';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const SprintGrid = () => {

    const dispatch = useDispatch();
    const workitems = useSelector(state => state.workItem.workitems);
    const emptywi = {
        title: '',
        type: 'task',
        assignto: {
            surname: ''
        },
        state: 'to do'
    };

    const [newTask, setNewTask] = useState('');
    console.log(newTask)

    let taskBoxesChildren = workitems.filter(item => {
        
        if (item.parentId) {
            return true;
        }
        return false;
    });

    let gridLines  = workitems.map(item => {

        if (item.parentId)
            return [];

        let displayNewBox = null;
        
        if (newTask === item.name) {
            displayNewBox = <Box workitem={{...emptywi, parentId: item.name}} mode="new" addNewTask={setNewTask}/>;
        }

        let taskBoxesToDo = taskBoxesChildren.filter(taskItem => {            
            return (taskItem.parentId === item.name && taskItem.state == 'to do');
        });
        let taskBoxesInProgress = taskBoxesChildren.filter(taskItem => {            
            return (taskItem.parentId === item.name && taskItem.state == 'in progress');
        });
        let taskBoxesDone = taskBoxesChildren.filter(taskItem => {            
            return (taskItem.parentId === item.name && taskItem.state == 'done');
        });
        console.log(item.title + ' : ' + taskBoxesToDo.length);
        return [
            <div className='centered'><Box workitem={item} key={item.name}/></div>,
            <div className='task centered'>
                {displayNewBox}
                {taskBoxesToDo.map(task => <Box workitem={task} mode="edit"/>)}
                <ButtonAddTask parentId={item.name} addNewTask={setNewTask} />
            </div>,
            <div className='task centered'>{taskBoxesInProgress.map(task => <Box workitem={task} mode="edit"/>)}</div>,
            <div className='task centered'>{taskBoxesDone.map(task => <Box workitem={task} mode="edit"/>)}</div>
        ];
    });

    useEffect(() => {
        dispatch(initWorkItemsFully());
    }, []);

    return (
        <SimpleBar style={{ maxHeight: '90vh', width: '100%' }} >
            <h4 class="titre">Tableau Kanban</h4>
            <div className="sprintcontainer">
                {gridLines}
            </div>
        </SimpleBar>
    )
}

export default SprintGrid;