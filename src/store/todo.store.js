import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'All',
    Completed: 'Completed',
    Active: 'Active'
}

const state = {
    todos: [],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🦇');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;

}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {
    switch(filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Active:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(`${filter} does not exists.`);
    }
}

const addTodo = (description) => {
    if (!description) throw new Error("Todo object description is required");

    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

const editTodo = (todoId, description) => {
    const todoIndex = state.todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        state.todos[todoIndex].description = description;
        saveStateToLocalStorage();
    } else {
        throw new Error("Todo object provided does not exist");
    }
}

const toggleTodo = (todoId) => {
    const todoIndex = state.todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        state.todos[todoIndex].done = !state.todos[todoIndex].done;
        saveStateToLocalStorage();
    } else {
        throw new Error("Todo object provided does not exist");
    }

}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();

}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();

}

/**
 * 
 * @param {Filters} filter 
 */

const setFilter = (filter = Filters.All) => {
    if (Object.values(Filters).includes(filter)) {
        state.filter = filter;
    } else {
        throw new Error(`${filter} does not exists.`);
    }
    saveStateToLocalStorage();
}

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
    setFilter,
    getCurrentFilter,
}