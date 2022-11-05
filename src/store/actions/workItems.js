import * as actionTypes from './actionTypes';
import { URL_API } from '../../conf/config';

export const initWorkItems = (workitems) => {
    return {
        type: actionTypes.INIT_WORKITEM, 
        workitems: workitems
    }
}

export const addWorkItem = ( item ) => {
    return {
        type: actionTypes.ADD_WORKITEM,
        workitem: item
    };
};

export const updWorkItem = ( item ) => {
    return {
        type: actionTypes.UPD_WORKITEM,
        workitem: item
    };
};

export const removeWorkItem = ( name ) => {
    return {
        type: actionTypes.DELETE_WORKITEM,
        name
    };
};

export const filterTypeWorkItem = ( type ) => {
    return {
        type: actionTypes.FILTERTYPE_WORKITEM,
        itemtype: type
    };
};

export const filterUserWorkItem = ( user ) => {
    return {
        type: actionTypes.FILTERUSER_WORKITEM,
        itemuser: user
    };
};

export const openButton = (name) => {
    return {
        type: actionTypes.OPEN_BUTTON,
        name: name
    }
}

export const initWorkItemsFully = (setLoader) => {
    return async (dispatch) => {
        setLoader(true);
        try {
            const workitems = await fetch(`${URL_API}/workitem.json`, {method: 'GET'});
            const workitemsjson = await workitems.json();
            console.log("workitemsjson!!!", workitemsjson);
            const fulltab = Object.keys(workitemsjson).map(key =>{
                return {...workitemsjson[key], name: key};
            });
            fulltab.sort((a,b) =>  b.updatedAt - a.updatedAt);
            dispatch(initWorkItems(fulltab));
            setLoader(false);
        }
        catch(err){
            console.log('erreur=' + err);
            dispatch(initWorkItems([]));
            setLoader(false);
        } 
    }
}

export const addWorkItemFully = ({title, assignto, state, type, parentId}) => {
    return async (dispatch) => {
        try {
            console.log('ready ?');
            let item = {
                title,
                type,
                assignto,
                state,
                tags: [],
                comments: [],
                parentId
            };
            const wki = await fetch(`${URL_API}/workitem.json`, {
                method: 'POST',
                body: JSON.stringify(item)
            });
            const wkijson = await wki.json();
            console.log(wkijson.name);
            item.name = wkijson.name;
            dispatch(addWorkItem(item));
        }
        catch(err){
            console.log('erreur=' + err);
        } 
    }  
}

export const updateWorkItemFully = ({name, title, assignto, state, type, parentId}) => {
    return async (dispatch) => {
        try {
            console.log('update ?');
            let item = {
                name,
                title,
                type,
                assignto,
                state,
                tags: [],
                comments: [],
                parentId
            };
            const wki = await fetch(`${URL_API}/workitem/${name}.json`, {
                method: 'PUT',
                body: JSON.stringify(item)
            });
            const wkijson = await wki.json();
            //console.log(wkijson.name);
            //item.name = wkijson.name;
            dispatch(updWorkItem(item));
        }
        catch(err){
            console.log('erreur=' + err);
        } 
    }  
}


export const deleteWorkItemFully = (name) => {
    return async (dispatch) => {
        try {
            console.log('ready ?');
            const wki = await fetch(`${URL_API}/workitem/${name}.json`, {
                method: 'DELETE'
            });
            if (wki.status === 200) {
                dispatch(removeWorkItem(name));
            }
        }
        catch(err){
            console.log('erreur=' + err);
        } 
    }  
}