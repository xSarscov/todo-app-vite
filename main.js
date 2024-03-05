import './style.css';
import { app } from './src/todos/app';

import todoStore from "./src/store/todo.store";

todoStore.initStore();

app('#app');