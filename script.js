import { UserUI } from './classes/ui/UserUI.js';
import { Project } from './classes/Project.js';
import { Todo } from './classes/Todo.js';
import { User } from './classes/User.js';
import { ProjectUI } from './classes/ui/ProjectUI.js';
import { Local } from './classes/LocalStorage.js';

const defaultUser = Local.load() || new User('User');
UserUI.renderUser(defaultUser);





// // checks for todo
// const expTodo = defaultUser.projects[0].todos[0];
// console.groupCollapsed('Todo');

// console.log(expTodo);
// console.log(expTodo.serialize());
// console.log(Todo.deserialize(expTodo.serialize()));

// console.groupEnd();


// // checks for project
// const expProject = defaultUser.projects[0];
// console.groupCollapsed('Project');

// console.log(expProject);
// console.log(expProject.todos);

// // serialize
// console.log(expProject.serialize());
// console.log(expProject.serialize().todos);

// // deserialize
// console.log(Project.deserialize(expProject.serialize()));
// console.log(Project.deserialize(expProject.serialize()).todos);

// console.groupEnd();

// // checks for user
// const expUser = defaultUser;
// console.groupCollapsed('User');

// console.log(defaultUser);

// // serialize
// defaultUser.saveToLocalStorage();
// console.log(localStorage.getItem('user'));

// // deserialize
// console.log(User.loadFromLocalStorage());

// console.groupEnd();