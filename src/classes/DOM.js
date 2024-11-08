export class DOM {
    static createElement(tag, classNames = [], textContent = '') {
        const element = document.createElement('tag');
        element.classList.add(...classNames);
        element.textContent = textContent;
        return element;
    }

    static clearContainer(container) {
        container.innerHTML = '';
    }

    static appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }

    static renderProjectTodos(project) {
        const todosContainer = document.querySelector('.todos-container');
        DOM.clearContainer(todosContainer);

        project.todos.forEach(todo => {
            const todoEl = DOM.createElement('div', ['todo']);
            todoEl.setAttribute('data-todo-id', todo.id);

            const titleContainer = DOM.createElement('div', ['title-container']);

            const toggleBtn = DOM.createElement(
                'button',
                ['toggle'],
                todo.status ? '\u25cf' : '\u00a0'
            );

            const titleEl = DOM.createElement('div',
                ['title', todo.status ? 'checked' : 'unchecked'],
                todo.title);

            const deleteBtn = DOM.createElement('button', ['delete'], 'x');

            DOM.appendChildren(titleContainer, [toggleBtn, titleEl]);

            DOM.appendChildren(todoEl, [titleContainer, deleteBtn]);

            DOM.appendChildren(todosContainer, [todoEl]);


            // event listeners
            toggleBtn.addEventListener('click', () => {
                todo.status ? todo.status = false : todo.status = true;

                DOM.updateProjectTodos(project);
            })

            deleteBtn.addEventListener('click', () => {
                const { todoId } = todoEl.dataset;
                console.log(todoId);
                DOM.deleteTodo(project, todoId);
            })
        })
    }

    static updateProjectTodos(project) {
        const todosContainer = document.querySelector('.todos-container');
        DOM.clearContainer(todosContainer);
        DOM.renderProjectTodos(project);
    }

    static deleteTodo(project, todoId) {
        project.deleteTodo(todoId);
        DOM.updateProjectTodos(project);
    }
}