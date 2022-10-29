import {users, workitems} from '../../data/fakedata';
import styles from './Workitems.module.css';
import WorkItemsTable from '../WorkItemsTable/WorkItemsTable';
import WorkItemsButtons from '../WorkItemsButtons/WorkItemsButtons';
import { useForm } from "react-hook-form";
import { useParams, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from "react-select";


const WorkItemForm = props => {

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
        mode: "all",
        reValidateMode: "onBlur"
      });
    const { name, type } = useParams();

    const onSubmit = async (data) => {
        console.log(data);console.log('id='+ name)
        try {
            
            let item = {
                title: data.title,
                type: data.type,
                description: data.description,
                assignto: {id: 1, surname: 'John Doe', email: 'johndoe@free.fr', color: '#001e51'},
                state: data.state,
                tags: [],
                comments: [],
                updatedAt: Date.now()
            };
            // modif par defaut
            let urlapi = `https://azuredevops-a0860-default-rtdb.europe-west1.firebasedatabase.app/workitem/${name}.json`;
            let headers = {
                method: 'PUT',
                body: JSON.stringify(item)
            };
            if (type){ // creation
                urlapi = `https://azuredevops-a0860-default-rtdb.europe-west1.firebasedatabase.app/workitem.json`;
                headers = {
                    method: 'POST',
                    body: JSON.stringify(item)
                };
            }
            const wku = await fetch(urlapi, headers);
            console.log('rrr')
            const wkujson = await wku.json();
            console.log('wkujson=', wkujson)
            setRedirect(true)

        }
        catch(err){
            console.log('erreur=' + err);
        } 
    }

    const defaultwi = {title: '', description: '', type: ''};
    let [workitemjson, setWorkitemjson] = useState(defaultwi);
    let [redirect, setRedirect] = useState(false);

    useEffect(async () => {

        if (type && ['bug', 'epic', 'feature', 'productitem', 'support', 'task'].includes(type)) {
            setValue("type", type);
            setWorkitemjson(defaultwi);
        }
        else {
            try {
                console.log('id='+ name)
                const workitem = await fetch(`https://azuredevops-a0860-default-rtdb.europe-west1.firebasedatabase.app/workitem/${name}.json`, {method: 'GET'});
                workitemjson = await workitem.json();
                setValue("title", workitemjson.title);
                setValue("type", workitemjson.type);
                setValue("state", workitemjson.state);
                console.log("workitemjson!!!", workitemjson);
                setWorkitemjson(workitemjson);
            }
            catch(err){
                console.log('erreur=' + err);
                setWorkitemjson({title: 'error loading', type: ''});
            }
        }
    }, []);
  
    let goto;
    if (redirect) {
       goto = <Redirect to="/" />
    }

    return (
        
        <div className={styles.table} style={{display: 'flex', flexDirection: 'column'}}>
            {goto}
            <h4>{workitemjson.title.length === 0 ? 'Création':'Edition'} d'un WorkItem {name}</h4>

            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                Titre: <input defaultValue={workitemjson.title} {...register("title", { required: true })} />
            </div>            
            <div>
                Description: <input defaultValue={workitemjson.description} {...register("description", { required: false })} />
            </div>            
            <div>
                Type:                 
                <select {...register("type")}>
                    <option value="bug">bug</option>
                    <option value="epic">epic</option>
                    <option value="feature">feature</option>
                    <option value="productitem">productitem</option>
                    <option value="support">support</option>
                    <option value="task">task</option>
                </select>
            </div>    
            <div>
                State:
                <select {...register("state")}>
                    <option value="investigation">investigation</option>
                    <option value="new">new</option>
                    <option value="pending">pending</option>
                </select>
            </div>

            {/* errors will return when field validation fails  */}
            {errors.title && <span>This field is required</span>}
            <div>        
                <input type="submit" />
            </div>

            </form>
        </div>
    );
}

export default WorkItemForm;