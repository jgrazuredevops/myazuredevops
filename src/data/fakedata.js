export const users = [
    {id: 1, surname: 'John Doe', email: 'johndoe@free.fr'},
    {id: 2, surname: 'Paul Boo', email: 'paul.boo@azure.com'},
    {id: 3, surname: 'Stefanie Toute', email: 'stefietoute@yahoo.com'}
];

export const workitems = [
    {
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
    },
    {
        id: 3,
        title: '2662: Système automatisé de mise à jour de l\'environnement de PP avec les données de PR',
        type: 'product backlog item',
        assignto: {},
        state: 'in progress',
        tags: [],
        comments: ['rtrytryryt', 'jjj', 'tryrt', 'ghfhtrft'],
        description: '',
        environnement: 'preproduction'
    },
    {
        id: 4,
        title: 'Surbrillance multiple dans le Sommaire',
        type: 'bug',
        assignto: {id: 1, surname: 'John Doe', email: 'johndoe@free.fr', color: '#001e51'},
        state: 'investigation',
        tags: [],
        comments: [],
        description: '',
        environnement: 'preproduction'
    },
    {
        id: 5,
        title: 'questionnaires en mode groupement',
        type: 'bug',
        assignto: {id: 3, surname: 'Stefanie Toute', email: 'stefietoute@yahoo.com', color: '#5c2893'},
        state: 'pending',
        tags: ['recette'],
        comments: [],
        description: '',
        environnement: 'preproduction'
    }
];
