import './style.css';
import './src/todos/nav.css';
import './src/todos/nav.js';
import { app } from './src/todos/app';

import todoStore from "./src/store/todo.store";

todoStore.initStore();

app('#app');