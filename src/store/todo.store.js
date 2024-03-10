import { Todo } from "../todos/models/todo.model";

/**
 * Filters for todo items.
 * @readonly
 * @enum {string}
 */
export const Filters = {
    /** Filter for all todo items. */
    All: 'All',
    /** Filter for completed todo items. */
    Completed: 'Completed',
    /** Filter for active todo items. */
    Active: 'Active'
}

/**
 * Represents the state of the todo store.
 * @type {Object}
 * @property {Todo[]} todos - Array of todo items.
 * @property {Filters} filter - Current filter for todo items.
 */
const state = {
    todos: [],
    filter: Filters.All,
}

/**
 * Initializes the todo store.
 */
const initStore = () => {
    loadStore();
}

/**
 * Loads state from local storage into the store.
 */
const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;
}

/**
 * Saves the current state to local storage.
 */
const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Retrieves todo items based on the given filter.
 * @param {Filters} [filter=Filters.All] - The filter to apply.
 * @returns {Todo[]} Array of todo items.
 * @throws {Error} Throws an error if an invalid filter is provided.
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Active:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`${filter} does not exist.`);
    }
}

/**
 * Adds a new todo item.
 * @param {string} description - The description of the todo item.
 * @throws {Error} Throws an error if the description is empty.
 */
const addTodo = (description) => {
    if (!description) throw new Error("Todo object description is required.");

    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

/**
 * Edits the description of a todo item.
 * @param {string} todoId - The ID of the todo item.
 * @param {string} description - The new description.
 * @throws {Error} Throws an error if the todo ID or description is empty, or if the todo item does not exist.
 */
const editTodo = (todoId, description) => {
    if (!todoId || !description) throw new Error("Todo object description and ID are required.");

    const todoIndex = state.todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        state.todos[todoIndex].description = description;
        saveStateToLocalStorage();
    } else {
        throw new Error("Todo object provided does not exist.");
    }
}

/**
 * Toggles the completion status of a todo item.
 * @param {string} todoId - The ID of the todo item.
 * @throws {Error} Throws an error if the todo ID is empty or if the todo item does not exist.
 */
const toggleTodo = (todoId) => {
    const todoIndex = state.todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        state.todos[todoIndex].done = !state.todos[todoIndex].done;
        saveStateToLocalStorage();
    } else {
        throw new Error("Todo object provided does not exist.");
    }
}

/**
 * Deletes a todo item.
 * @param {string} todoId - The ID of the todo item.
 * @throws {Error} Throws an error if the todo ID is empty.
 */
const deleteTodo = (todoId) => {
    if (!todoId) throw new Error("Todo object ID is required.");

    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

/**
 * Deletes all completed todo items.
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * Searches for todo items containing the specified query string.
 * @param {string} query - The query string to search for.
 * @returns {Todo[]} Array of matching todo items.
 */
const searchTodos = (query) => {
    const todos = getTodos(Filters.All);
    const matches = todos.filter(todo => todo.description.toUpperCase().includes(query.toUpperCase()));
    return matches;
}

/**
 * Sets the current filter for todo items.
 * @param {Filters} [filter=Filters.All] - The filter to apply.
 * @throws {Error} Throws an error if an invalid filter is provided.
 */
const setFilter = (filter = Filters.All) => {
    if (Object.values(Filters).includes(filter)) {
        state.filter = filter;
    } else {
        throw new Error(`${filter} does not exist.`);
    }

    saveStateToLocalStorage();
}

/**
 * Gets the current filter for todo items.
 * @returns {Filters} The current filter.
 */
const getCurrentFilter = () => state.filter;

export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    searchTodos,
    setFilter,
    getCurrentFilter,
}
