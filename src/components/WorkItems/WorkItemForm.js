import {users} from '../../data/fakedata';
import styles from './Workitems.module.css';
import WorkItemsTable from '../WorkItemsTable/WorkItemsTable';
import WorkItemsButtons from '../WorkItemsButtons/WorkItemsButtons';
import { useForm } from "react-hook-form";
import { useParams, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from "react-select";
import { URL_API, WORKITEMTYPES, STATES } from '../../conf/config';
import { getWorkitemsTypes } from '../../lib/util';
import Spinner from '../UI/Spinner/Spinner'

const WorkItemForm = props => {

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
        mode: "all",
        reValidateMode: "onBlur"
      });
    const { name, type } = useParams();

    const onSubmit = async (data) => {
        try {
            
            let assignto = [{id: 1, surname: 'John Doe', email: 'johndoe@free.fr', color: '#001e51'}];
            if (data.userid) {
                assignto = users.filter(u => u.id === +data.userid);
            }
            let item = {
                title: data.title,
                type: data.type,
                description: data.description,
                assignto: assignto[0],
                state: data.state,
                tags: [],
                comments: [],
                updatedAt: Date.now()
            };
            // modif par defaut
            let urlapi = `${URL_API}/workitem/${name}.json`;
            let headers = {
                method: 'PUT',
                body: JSON.stringify(item)
            };
            if (type){ // creation
                urlapi = `${URL_API}/workitem.json`;
                headers = {
                    method: 'POST',
                    body: JSON.stringify(item)
                };
            }
            const wku = await fetch(urlapi, headers);
            const wkujson = await wku.json();
            setRedirect(true)
        }
        catch(err){
            console.log('erreur=' + err);
        } 
    }

    const defaultwi = {title: '', description: '', type: ''};
    let [workitemjson, setWorkitemjson] = useState(defaultwi);
    let [redirect, setRedirect] = useState(false);
    let [loading, setLoading] = useState(false);

    useEffect(async () => {

        if (type && getWorkitemsTypes().includes(type)) {
            setValue("type", type);
            setWorkitemjson(defaultwi);
        }
        else {
            try {
                setLoading(true);
                const workitem = await fetch(`${URL_API}/workitem/${name}.json`, {method: 'GET'});
                workitemjson = await workitem.json();
                setValue("title", workitemjson.title);
                setValue("type", workitemjson.type);
                setValue("state", workitemjson.state);
                setValue("userid", workitemjson.assignto.id);
                setWorkitemjson(workitemjson);
                setLoading(false);
            }
            catch(err){
                console.log('erreur=' + err);
                setWorkitemjson({title: 'error loading', type: ''});
                setLoading(false);
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
            { loading ? <Spinner/> : <div>
            <h4>{workitemjson.title.length === 0 ? 'Création':'Edition'} d'un WorkItem {name}</h4>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div class={styles.frmLine}>
                <div class={styles.frmTitle}>Titre</div> 
                <div class={styles.frmInput}><input class="input-box" defaultValue={workitemjson.title} {...register("title", { required: true })} /></div>
            </div>            
            <div class={styles.frmLine}>
                <div class={styles.frmTitle}>Description</div>
                <div class={styles.frmInput}>
                    <input class="input-box" defaultValue={workitemjson.description} {...register("description", { required: false })} />
                </div>
            </div>            
            <div class={styles.frmLine}>
                <div class={styles.frmTitle}>Type</div>
                <div class={styles.frmInput}>
                    <select class="select-box" {...register("type")}>
                        <option value={WORKITEMTYPES.BUG.key}>{WORKITEMTYPES.BUG.text}</option>
                        <option value={WORKITEMTYPES.EPIC.key}>{WORKITEMTYPES.EPIC.text}</option>
                        <option value={WORKITEMTYPES.FEATURE.key}>{WORKITEMTYPES.FEATURE.text}</option>
                        <option value={WORKITEMTYPES.PRODUCTBACKLOGITEM.key}>{WORKITEMTYPES.PRODUCTBACKLOGITEM.text}</option>
                        <option value={WORKITEMTYPES.SUPPORT.key}>{WORKITEMTYPES.SUPPORT.text}</option>
                        <option value={WORKITEMTYPES.TASK.key}>{WORKITEMTYPES.TASK.text}</option>
                    </select>
                </div>
            </div>    
            <div class={styles.frmLine}>
                <div class={styles.frmTitle}>State</div>
                <div class={styles.frmInput}>
                    <select class="select-box" {...register("state")}>
                        <option value={STATES.INVESTIGATION.key}>{STATES.INVESTIGATION.text}</option>
                        <option value={STATES.NEW.key}>{STATES.NEW.text}</option>
                        <option value={STATES.PENDING.key}>{STATES.PENDING.text}</option>
                    </select>
                </div>
            </div>
            <div class={styles.frmLine}>
                <div class={styles.frmTitle}>Utilisateur</div>
                <div class={styles.frmInput}>
                    <select class="select-box" {...register("userid")}>
                        { users.map(u => <option value={u.id}>{u.surname}</option>)}
                    </select>
                </div>
            </div>

            {errors.title && <span>Ce champ est requis</span>}
            <div class={styles.frmLine}>        
                <input type="submit" class="btn"/>
            </div>

            </form>
            </div>
            }
        </div>
    );
}

export default WorkItemForm;