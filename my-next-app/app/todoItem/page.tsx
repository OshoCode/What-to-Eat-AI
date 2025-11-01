async function FetchTodoItem() {
    const res = await fetch('http://localhost:3000/api/todoItem', {
        method: 'GET',
    });
    return res.json();
}

const TodoItem = async () => {
    const data = await FetchTodoItem();
    console.log(data);
    return (
        <div>
            <h1>Todo Item</h1>
        </div>
    )
}
export default TodoItem;