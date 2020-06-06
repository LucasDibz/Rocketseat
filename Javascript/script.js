const listElement = document.querySelector('#list ul');
const inputElement = document.querySelector('#list input');
const buttonElement = document.querySelector('#list button');
const todos = JSON.parse(localStorage.getItem('list_todos')) || [];

//Clean and Render list itens
renderTodos = () => {
    listElement.innerHTML = '';
    for (todo of todos) {
        //Create new li element
        const todoElement = document.createElement('li');
        const todoText = document.createTextNode(todo);

        //Link Excluir
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        let pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', `deleteTodo(${pos})`)
        const linkText = document.createTextNode(' Excluir');
        linkElement.appendChild(linkText);

        //Append all
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

renderTodos();

//Add Items to List
addTodo = () => {
    todos.push(inputElement.value);
    renderTodos();
    inputElement.value = '';
    saveToLocalStorage();
}

//Bind to Button
buttonElement.onclick = addTodo;

//Remove Items from List
deleteTodo = (i) => {
    todos.splice(i, 1);
    renderTodos();
    saveToLocalStorage();
}

saveToLocalStorage = () => {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}
