const initialState = {
    workitems: [
        /*{
            id: 1,
            title: 'Nouvelle requête statistique 2020 ne s\'execute pas la nuit',
            type: 'bug',
            assignto: {id: 2, surname: 'Paul Boo', email: 'paul.boo@azure.com', color: '#027d00'},
            state: 'new',
            tags: ['items','livraison'],
            comments: ['rtrtryru', 'xdxfsdrdr'],
            description: '',
            environnement: 'preproduction'
        },
        {
            id: 2,
            title: '2479: [forum] être informé des nouveaux like',
            type: 'feature',
            assignto: {id: 1, surname: 'John Doe', email: 'johndoe@free.fr', color: '#001e51'},
            state: 'new',
            tags: ['recette', 'item', 'livraison'],
            comments: ['erereee'],
            description: '',
            environnement: 'preproduction'
        }*/
    ],
    filtertype: [],
    filteruser: [],
    buttonsopened: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case 'INIT_WORKITEM':
            return {...state, workitems: action.workitems};

        case 'ADD_WORKITEM':
            console.log('ADD_WORKITEM');
            //const maxid = state.workitems.reduce((prev, curr)=> {
            //    return (prev.id > curr.id) ? prev : curr
            //}, {id: 0});
            //const newitem = action
            return {...state, workitems: [...state.workitems, action.workitem]};

        case 'UPD_WORKITEM':
            console.log('UPD_WORKITEM');
            const updworkitems = state.workitems.map(item => {
                console.log('je compare:', item.name + ' et ' + action.workitem.name)
                if (item.name === action.workitem.name){
                    console.log('found!', action.workitem)
                    return action.workitem;
                }
                else
                    return item;
            });
            return {...state, workitems: updworkitems};
        
        case 'DELETE_WORKITEM':
            const newworkitems = state.workitems.filter(wi => wi.name !== action.name);
            return {...state, workitems: newworkitems};

        case 'FILTERTYPE_WORKITEM':
            let filtertype = [];
            if (state.filtertype.includes(action.itemtype)){
                filtertype = state.filtertype.filter(t=>t!==action.itemtype);
            } else {
                filtertype = [...state.filtertype, action.itemtype];
            }
            return {...state, filtertype: filtertype};

        case 'FILTERUSER_WORKITEM':
            let filteruser = [];
            if (state.filteruser.includes(action.itemuser)){
                filteruser = state.filteruser.filter(t=>t!==action.itemuser);
            } else {
                filteruser = [...state.filteruser, action.itemuser];
            }
            console.log(filteruser);
            return {...state, filteruser: filteruser};

        case 'OPEN_BUTTON':
            console.log('OPEN_BUTTON');
            let buttonsopened = '';
            /*if (state.buttonsopened.includes(action.name)){
                buttonsopened = state.buttonsopened.filter(t=>t!=action.name);
            } else {
                buttonsopened = [...state.buttonsopened, action.name];
            }*/
            console.log(buttonsopened);
            return {...state, buttonsopened: state.buttonsopened===action.name?'':action.name};

        default: 
            return state;
    }
};

export default reducer;