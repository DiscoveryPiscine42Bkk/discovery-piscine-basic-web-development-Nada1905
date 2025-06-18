function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let d = new Date();
        d.setTime(d.getTime() + (days*24*60*60*1000));
        expires = ";expires=" + d.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll('#ft_list .todo').forEach(todo => {
        todos.push(todo.textContent);
    });
    setCookie('todo_list', JSON.stringify(todos.reverse()), 365);
}

function loadTodos() {
    let data = getCookie('todo_list');
    if (data) {
        try {
            let todos = JSON.parse(data);
            todos.forEach(text => addTodo(text));
        } catch(e) {}
    }
}

function addTodo(text) {
    if (!text) return;
    let todo = document.createElement('div');
    todo.className = 'todo';
    todo.textContent = text;
    todo.onclick = function() {
        if (confirm('Do you want to remove this TO DO?')) {
            todo.remove();
            saveTodos();
        }
    };
    let list = document.getElementById('ft_list');
    list.insertBefore(todo, list.firstChild);
    saveTodos();
}

document.getElementById('new-btn').onclick = function() {
    let text = prompt('Enter a new TO DO:');
    if (text && text.trim() !==
    addTodo(text.trim());
    }
};

window.onload = loadTodos;