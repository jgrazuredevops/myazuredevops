


const ButtonAddTask = ({parentId, addNewTask}) => {


    return (
        <button className="btn-add-task" onClick={() => addNewTask(/*parents => {
            console.log('parents', parents);
            return [...parents, parentId]
            }*/parentId)}>
                +
        </button>
    );
}

export default ButtonAddTask;