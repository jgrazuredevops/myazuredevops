import {users, workitems} from '../../data/fakedata';
import styles from './Workitems.module.css';
import WorkItemsTable from '../WorkItemsTable/WorkItemsTable';
import WorkItemsButtons from '../WorkItemsButtons/WorkItemsButtons';

const WorkItems = props => {


    return (
        <div className={styles.table}>
            <h4>Liste des WorkItems</h4>

            <WorkItemsButtons />
            <WorkItemsTable />

        </div>
    );
}

export default WorkItems;