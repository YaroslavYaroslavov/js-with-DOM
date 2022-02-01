'use strict';

let buttonPlus = document.querySelector('#add'),
    input = document.querySelector('.header-input'),
    todo = document.querySelector('#todo'),
    todoComplete = document.querySelector('#completed'),
    todoList = [],
    todoListComplete = [],
    function upload() {
        if (localStorage.getItem('todo')) {
            todoList = JSON.parse(localStorage.getItem('todo'))
            displayMessages();
        }
    }


buttonPlus.addEventListener('click', function() {
    let newTodo = {
        todo: input.value,
        checked: false
    };

    todoList.push(newTodo);
    displayMessages()
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages() {
    let displayMessage = ''
    todoList.forEach(function(item, i) {
        displayMessage += `
       <li class="todo-item">
       ${item.todo}
       <div class="todo-buttons">
           <button class="todo-remove"></button>
           <button class="todo-complete"></button>
       </div>

   </li>
       `;
        // if (!item.checked) {
        todo.innerHTML = displayMessage;
        // } else { todoComplete.innerHTML = displayMessage }
    });
}
todo.addEventListener('click', function(event) {
    if (event.target.getAttribute('class') == 'todo-remove') {

        todoList.splice(event.target.parentNode.parentNode, 1)

        localStorage.setItem('todo', JSON.stringify(todoList));
        displayMessages()
    }

    if (event.target.getAttribute('class') == 'todo-complete') {
        let taskValue = event.target.parentNode.parentNode.textContent.replace(/\s/g, '')
        todoList.forEach(function(item) {
            if (item.todo === taskValue) {
                item.checked = !item.checked
            }
        })
        localStorage.setItem('todo', JSON.stringify(todoList));
        displayMessages()
    }
});