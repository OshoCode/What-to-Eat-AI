const form = document.querySelector('form');
const input = document.querySelector('#todo-input'); // Corrected selector
const list = document.querySelector('#todo-list'); // Corrected selector

let todos = getTodos();
render();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = input.value; // Corrected variable name
    if(todoText !== '') {
        const todoObject = {
            text: todoText, // Corrected property name
            completed: false
        };
        todos.push(todoObject);
        render();
        input.value = '';
        saveTodos();
    }
}

function render() {
    list.innerHTML = '';
    todos.forEach((todo, todoindex) => {
        const todoItem = createTodoItem(todo, todoindex);
        list.appendChild(todoItem);
    });
    addDeleteEventListeners();
}

function createTodoItem(todo, todoindex) {
    const todoItem = "task-" + todoindex;
    const todoLi = document.createElement('li');
    const todoText = todo.text;
    todoLi.className = 'todo-task';
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoItem}">
        <label class="task-checkbox" for="${todoItem}"><i class="ri-check-line"></i></label>
        <label for="${todoItem}" class="task-text">${todoText}</label>
        <button class="delete-btn"><i class="ri-delete-bin-line"></i></button>
    `;
    const checkbox = todoLi.querySelector(`#${todoItem}`);
    checkbox.addEventListener('click', () => {
        todos[todoindex].completed = checkbox.checked;
        saveTodos();
        render();
    });
    checkbox.checked = todo.completed;
    return todoLi;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    const todosFromStorage = localStorage.getItem('todos') || '[]';
    return JSON.parse(todosFromStorage);
}

function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            render();
        });
    });
}