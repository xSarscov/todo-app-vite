import todoStore, { Filters } from "../store/todo.store";
import htmlApp from "./app.html?raw";
import { editTodos, renderTodos } from "./use-cases";

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filter',
    TodoCount: '#pending-count',
}

/**
 * This function initializes the page
 * @param {String} elementId The id of the element where the page will be rendered
 */
export const app = (elementId) => {

    const showActiveCount = () => {
        const TodoCountText = document.querySelector(ElementIds.TodoCount);
        const todos = todoStore.getTodos(Filters.Active);
        TodoCountText.innerText = todos.length;
    }

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIds.TodoList, todos);
        showActiveCount();
    }

    (()=> {
        document.querySelector(elementId).innerHTML = htmlApp;
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const todoListLabels = document.querySelectorAll('label');
    const clearCompletedButton = document.querySelector(ElementIds.ClearCompletedButton);
    const filtersLi = document.querySelectorAll(ElementIds.TodoFilters);
    

    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.key !== 'Enter') return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const selectedTodoId = event.target.closest('[data-id]').dataset.id;
        
        if (event.target.className === 'destroy') {
            todoStore.deleteTodo(selectedTodoId);
            displayTodos();
        } else if (event.target.className === 'toggle') {
            todoStore.toggleTodo(selectedTodoId);
            displayTodos();
        }

    });

    todoListUL.addEventListener('dblclick', (event) => {
        if (event.target.tagName === 'LABEL') {

            const liElement = event.target.closest('li');
            liElement.classList.add('editing');
            const editTodoInput = document.createElement('input');
            editTodoInput.classList.add('edit');
            editTodoInput.value = liElement.querySelector('label').textContent;
            liElement.append(editTodoInput);
            editTodoInput.focus();
            
            editTodoInput.addEventListener('keyup', (e) => {
                if (e.key !== 'Enter') return;
                if (e.target.value.trim().length === 0) return;

                todoStore.editTodo(liElement.dataset.id, editTodoInput.value);
                displayTodos();
            });


            const isClickingOutside = (e) => {
                if (!e.target.closest('.editing')) {
                    liElement.classList.remove('editing')
                    editTodoInput.remove();
                    document.removeEventListener('click', isClickingOutside);
                }
            };
        
            
            document.addEventListener('click', isClickingOutside);
        }
        

    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });


    filtersLi.forEach(filterElement => {
        filterElement.addEventListener('click', (filterElement) => {
            filtersLi.forEach(element => element.classList.remove('selected'));
            filterElement.target.classList.add('selected');

            switch(filterElement.target.id) {
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

    filtersLi.item(0).classList.add('selected');

    
}