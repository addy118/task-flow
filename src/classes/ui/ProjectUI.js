import { DOM } from "./DOM.js";
import { Todo } from "../Todo.js";
import { TodoUI } from "./TodoUI.js";
import { handleProjectEvents } from "../../events/projectEvents.js";

export class ProjectUI {
    // userwise project tabs
    static renderProjectTabs(user) {
        TodoUI.renderProjectTodos(user.projects[user.projects.length - 1]);

        const projectsContainer = document.querySelector('.projects-container');
        DOM.clearContainer(projectsContainer);

        user.projects.forEach(project => {
            // dynamically render projects in project tabs
            const projectEl = DOM.createElement('div', ['project']);
            projectEl.setAttribute('data-project-id', project.id);

            const projectName = DOM.createElement('div', ['project-name'], project.name);
            const buttonsContainer = DOM.createElement('div', ['buttons-container']);
            const addTodoBtn = DOM.createElement('button', ['create-todo'], '+');
            const deleteProjectBtn = DOM.createElement('button', ['delete-project'], 'x');

            DOM.appendChildren(buttonsContainer, [addTodoBtn, deleteProjectBtn]);
            DOM.appendChildren(projectEl, [projectName, buttonsContainer]);
            DOM.appendChildren(projectsContainer, [projectEl]);

            // dynamically create modal for each project
            const todoDialog = TodoUI.createTodoDialog(project);
            DOM.appendChildren(projectEl, [todoDialog]);

            addTodoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                todoDialog.showModal();
            });

            // make the buttons interactive
            handleProjectEvents([user, project], [projectEl, deleteProjectBtn]);
        })
    }

    static updateProjectTabs(user) {
        const projectsContainer = document.querySelector('.projects-container');
        DOM.clearContainer(projectsContainer);
        ProjectUI.renderProjectTabs(user);
    }

    static deleteProject(user, projectId) {
        user.deleteProject(projectId);
        ProjectUI.updateProjectTabs(user);
    }

    static createProjectDialog() {
        const projectDialog = DOM.createElement('dialog', ['project-dialog']);
        const form = DOM.createElement('form', ['project-form']);
        form.setAttribute('action', 'script.js');

        const projectNameInput = DOM.createInput('project-name', 'Name: ', 'text');

        const submitButton = DOM.createElement('button', ['create-project'], 'Create');
        submitButton.setAttribute('type', 'submit');

        const cancelButton = DOM.createElement('button', ['project-cancel'], 'Cancel');
        cancelButton.setAttribute('type', 'button');

        DOM.appendChildren(form, [projectNameInput, submitButton, cancelButton]);
        DOM.appendChildren(projectDialog, form);

        return projectDialog;
    }
}