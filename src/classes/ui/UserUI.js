import { Project } from "../Project.js";
import { ProjectUI } from "./ProjectUI.js";
import { DOM } from "./DOM.js";
import { Local } from "../LocalStorage.js";

export class UserUI {
  static renderUser(defaultUser) {
    // render username of the user
    const username = document.querySelector(".username>h2");
    username.textContent = defaultUser.name;

    // set up modals for renaming user and creating projects
    UserUI.setupUserModals(defaultUser);

    Local.save(defaultUser);

    // initial render of projects & their todos
    ProjectUI.renderProjectTabs(defaultUser);

    return defaultUser;
  }

  static setupUserModals(user) {
    // create and enable modal for renaming the user
    const usernameDialog = UserUI.createUsernameDialog();
    document.body.appendChild(usernameDialog);

    DOM.handleModalListeners(
      "username-dialog",
      "rename",
      "rename-cancel",
      "username-form",
      [user],
      dependencies => {
        const [user] = dependencies;

        // get input
        let newUsernameInput = document.getElementById("user-name");

        // console.log('triggered rename')

        user.renameUser(newUsernameInput.value);
        UserUI.updateUsername(user);

        // console.log(user.name);

        // clear the previously inputted data
        newUsernameInput.value = "";
      }
    );

    // create and enable modal for adding new projects
    const projectDialog = ProjectUI.createProjectDialog();
    document.body.appendChild(projectDialog);

    DOM.handleModalListeners(
      "project-dialog",
      "add-project",
      "project-cancel",
      "project-form",
      [user],
      dependencies => {
        const [user] = dependencies;

        // get input
        let projectNameInput = document.getElementById("project-name");
        const newProject = new Project(projectNameInput.value);

        // add project to user
        user.addProject(newProject);

        // render the new modified user
        ProjectUI.renderProjectTabs(user);

        // clear the previously inputted data
        projectNameInput.value = "";
      }
    );
  }

  static createUsernameDialog() {
    const usernameDialog = DOM.createElement("dialog", ["username-dialog"]);
    const form = DOM.createElement("form", ["username-form"]);
    form.setAttribute("action", "script.js");

    const usernameInput = DOM.createInput("user-name", "Username: ", "text");

    const modalButtons = DOM.createElement("div", ["modal-buttons"]);
    const submitButton = DOM.createElement("button", ["rename-user"], "Create");
    submitButton.setAttribute("type", "submit");
    const cancelButton = DOM.createElement(
      "button",
      ["rename-cancel"],
      "Cancel"
    );
    cancelButton.setAttribute("type", "button");
    DOM.appendChildren(modalButtons, [submitButton, cancelButton]);

    DOM.appendChildren(form, [usernameInput, modalButtons]);
    DOM.appendChildren(usernameDialog, form);

    // to close modal on clicking outside of it
    usernameDialog.addEventListener("click", e => {
      e.stopPropagation();
      const rect = usernameDialog.getBoundingClientRect();

      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        usernameDialog.close();
      }
    });

    return usernameDialog;
  }

  static updateUsername(user) {
    const username = document.querySelector(".username>h2");
    username.textContent = user.name;
  }
}
