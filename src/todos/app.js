import todoStore, { Filters } from "../store/todo.store";
import htmlApp from "./app.html?raw";
import { editTodoHTML, renderTodos } from "./use-cases";

/**
 * IDs of elements used in the application.
 * @readonly
 * @enum {string}
 */
const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filter',
    TodoCount: '#pending-count',
    SearchTodoInput: '#search-todo-input',
    ListTitle: '.list-title',
    AddTodoSection: '.add-todo-section',
}

/**
 * Initializes the todo application.
 * @param {string} elementId - The ID of the element where the page will be rendered.
 */
export const app = (elementId) => {
    /**
     * Handles the display of the clear completed button.
     */
    const handleDeleteCompletedButton = () => {
        const clearCompletedButton = document.querySelector(ElementIds.ClearCompletedButton);

        if (todoStore.getTodos(Filters.Completed).length > 0) {
            clearCompletedButton.style.display = 'block';
            clearCompletedButton.addEventListener('click', () => {
                todoStore.deleteCompleted();
                displayTodos();
            });
        }
        else {
            clearCompletedButton.style.display = 'none';
        }
    }

    /**
     * Updates the todo count.
     */
    const showActiveCount = () => {
        const TodoCountText = document.querySelector(ElementIds.TodoCount);
        const todos = todoStore.getTodos(Filters.Active);
        TodoCountText.innerText = todos.length;
    }

    /**
     * Displays todos according to their filter.
     */
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
        showActiveCount();
        handleDeleteCompletedButton();
    }

    (()=> {
        document.querySelector(elementId).innerHTML = htmlApp;
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const filtersLi = document.querySelectorAll(ElementIds.TodoFilters);
    const searchTodoInput = document.querySelector(ElementIds.SearchTodoInput);
    const listTitle = document.querySelector(ElementIds.ListTitle);
    const addTodoSection = document.querySelector(ElementIds.AddTodoSection);

    /**
     * Handles input events on the search input.
     * @param {InputEvent} event - The input event.
     */
    searchTodoInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        if (query.length === 0) {
            addTodoSection.style.display = 'block';
            listTitle.innerText = 'Tasks';
            displayTodos();
            return;  
        }

        addTodoSection.style.display = 'none';

        const matches = todoStore.searchTodos(query);
        
        listTitle.innerText = (matches.length === 0) ? `No result found for "${query}"` : `Searching for "${query}"`;

        renderTodos(ElementIds.TodoList, matches);
    });

    // Add a new todo each time the user presses enter on the input
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.key !== 'Enter') return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    //  Mark the todo as complete if the user presses the Done checkbox or removes it if the user presses the Remove button
    todoListUL.addEventListener('click', (event) => {
        const liElement = event.target.closest('[data-id]');
        
        if (!liElement) return;

        const selectedTodoId = liElement.dataset.id;
        

        if (event.target.closest('.destroy')) {
            todoStore.deleteTodo(selectedTodoId);
        } else if (event.target.closest('.toggle')) {
            todoStore.toggleTodo(selectedTodoId);
        }
        
        displayTodos();
    });

    // Activates todo edit mode when the user double-clicks on it and edits it when the user presses enter
    todoListUL.addEventListener('dblclick', (event) => {
        const selectedElement = event.target;
        const labelElement = event.target.closest('label');

        if (labelElement !== selectedElement) return;
        
        const liElement = event.target.closest('li');
        liElement.classList.add('editing');
        const editTodoInput = editTodoHTML(liElement);
        
        editTodoInput.addEventListener('keyup', (e) => {
            if (e.key !== 'Enter') return;
            if (e.target.value.trim().length === 0) return;

            todoStore.editTodo(liElement.dataset.id, editTodoInput.value);
            displayTodos();
        });
    });

    // Filters todos each time the user presses one of the filter menu options and adds an active CSS class
    filtersLi.forEach(filterElement => {
        filterElement.addEventListener('click', (filterElement) => {
            switch(filterElement.target.closest('a').id) {
                case 'all':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'active':
                    todoStore.setFilter(Filters.Active)
                    break;
                case 'completed':
                    todoStore.setFilter(Filters.Completed)
                    break;
            }

            displayTodos();
        });
    });
}
