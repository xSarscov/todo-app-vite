import { Todo } from "../models/todo.model";
import { editTodos } from "./";

/**
 * 
 * @param {Todo} todo 
 * @returns {HTMLElement}
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('Todo object must be provided.');

    const {done:isDone, description, id} = todo;

    const html = `
    <div class="view">
        <input class="toggle" type="checkbox" ${isDone ? 'checked' : ''}>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    `;
    const liElement = document.createElement('li');
    if (isDone) liElement.classList.add('completed');
    
    liElement.setAttribute('data-id', id);
    liElement.innerHTML = html;

    return liElement;
}