
const getColorState = (state) => {
    switch(state){
        case 'committed':
        case 'in progress':
            return '#007acb';
        case 'pending':
            return '#f48b1f';
        default:
            return '#b1b1b1';
    }
}

const getColor = (t) => {
    return t;
}

const getAvatar = (surname) => {
    let noms = surname.split(' ');
    let initiales = noms.map(n => {
        return n[0].toUpperCase();
    });
    return initiales.join('');
}

const getUserObjFromId = (id) => {

    const users = [
        {id: 3, surname: 'Stefanie Toute', email: 'stefietoute@yahoo.com', color: '#5c2893'},
        {id: 1, surname: 'John Doe', email: 'johndoe@free.fr', color: '#001e51'},
        {id: 2, surname: 'Paul Boo', email: 'paul.boo@azure.com', color: '#027d00'}
    ];
    let user = users.filter(user=>user.id === +id);
    if (user.length === 1)
        return user[0];
    return {};
}
export {getColorState, getColor, getAvatar, getUserObjFromId};