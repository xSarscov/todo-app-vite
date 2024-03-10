# To-Do App

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

This is a simple To-Do app created using JavaScript, HTML, CSS, Bootstrap library, and Vite. It was developed as part of the second practice for the JavaScript course on the [DevTalles](https://cursos.devtalles.com/) platform by Fernando Herrera. The app focuses on practicing basic JavaScript concepts, DOM manipulation, module concepts, and local storage for data persistence. The project also demonstrates the use of classes in JavaScript to create models, modular code organization, and the use of UUID as a dependency to generate unique IDs for records. 

## Technologies Used
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
- ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## Development
The project was set up and built using Vite, which is a fast build tool for modern web development. Node.js and npm were used to manage dependencies and run the development server.

## Features
- Simple To-Do app for managing tasks.
- Basic UI using Bootstrap for styling.
- Ability to add, delete, and mark tasks as complete.
- Data persistence using local storage.
- Unique IDs generated for tasks using UUID.
- Search functionality to find tasks.
- Double-click on a task to activate edit mode and edit its content.
- Dark and light mode toggle.
- Delete button appears on hover for each task.

![To-Do App preview](https://github.com/xSarscov/todo-app-vite/assets/110932159/7651993d-e8a9-489f-9573-62118e92a248)


## Installation
Follow these steps to run the project using Node.js and npm:
1. Clone this repository to your local machine:
```
git clone https://github.com/xSarscov/todo-app-vite.git
```
2. Change your current directory to the cloned repository:
```
cd todo-app-vite
```
3. Install the required dependencies:
```
npm install
```
4. Start the development server:
```
npm run dev
```
5. Open your web browser and visit http://localhost:5173 to use To Do App.
   
You can also try the live demo [here](https://todo-app-vitejs.netlify.app/).

## Usage
- To add a new task, enter the task description in the input field and press Enter.
- To delete a task, hover over the task and click the delete button.
- To mark a task as complete, click the checkbox next to the task.
- To search for tasks, enter the search query in the search input field and press Enter.
- To edit a task, double-click on the task and modify its content in edit mode by pressing Enter.

The tasks will be persisted locally, so you can close and reopen the app without losing your tasks.
