const headerInput = document.querySelector('.header-input'),
    addButton = document.querySelector('#add'),
    todo = document.querySelector('#todo'),
    completed = document.querySelector('#completed'),
    todoRemove = document.querySelectorAll('.todo-remove'),
    todoComplete = document.querySelector('.todo-complete');

let data = {
    todo: [],
    completed: [],
};

const addItem = (name, item) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const div = document.createElement('div');
    const todoRemove = document.createElement('button');
    const todoComplete = document.createElement('button');
    li.classList.add('todo-item');
    div.classList.add('todo-buttons');
    todoRemove.classList.add('todo-remove');
    todoComplete.classList.add('todo-complete');

    div.appendChild(todoRemove);
    div.appendChild(todoComplete);
    li.appendChild(span);
    li.appendChild(div);

    span.textContent = headerInput.value || item;
    if (span.textContent === '') {

    } else {
        if (name === todo) {
            data.todo.push(span.textContent);
            todo.insertAdjacentElement('afterbegin', li);
        }
        if (name === completed) {
            data.completed.push(span.textContent);
            completed.insertAdjacentElement('afterbegin', li);
        }
    }
    headerInput.value = '';
    saveUl();

    todoRemove.addEventListener('click', () => removeItem(todoRemove.parentNode.parentNode));
    todoComplete.addEventListener('click', () => completeTask(todoComplete.parentNode.parentNode));
};

const completeTask = (todoComplete) => {
    const todoItem = document.querySelectorAll('.todo-item');
    todoItem.forEach(item => {
        if (todoComplete.textContent === item.textContent) {
            if (completed.contains(todoComplete)) {
                data.todo.push(data.completed.splice(data.completed.indexOf(todoComplete.textContent), 1));
                todo.insertAdjacentElement('afterbegin', todoComplete);
            } else {
                data.completed.push(data.todo.splice(data.todo.indexOf(todoComplete.textContent), 1));
                completed.insertAdjacentElement('afterbegin', todoComplete);
            };
        };
    });
    saveUl();
};

const removeItem = (todoDel) => {
    const todoItem = document.querySelectorAll('.todo-item');
    const whatToDel = (todo.contains(todoDel)) ? data.todo : data.completed;
    todoItem.forEach(item => {
        if (todoDel.textContent === item.textContent) {
            whatToDel.splice(whatToDel.indexOf(todoDel.textContent), 1);
            todoDel.remove();
        };
    });
    saveUl();
};

const saveUl = () => {
    const arrTodo = data.todo,
        arrCompleted = data.completed;
    localStorage.setItem('todo', arrTodo);
    localStorage.setItem('completed', arrCompleted);
};

addButton.addEventListener('click', () => addItem(todo));
headerInput.addEventListener('keydown', (e) => { if (e.keyCode == 13) addItem(todo); });

document.addEventListener("DOMContentLoaded", () => {
    const todoArr = localStorage.getItem('todo');
    const completedArr = localStorage.getItem('completed');
    todoArr != '' && todoArr.split(',').map(item => addItem(todo, item));
    completedArr != '' && completedArr.split(',').map(item => addItem(completed, item));
});