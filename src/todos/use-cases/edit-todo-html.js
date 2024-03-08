/**
 * Modifies the HTML of the to-do list element (liElement) to activate edit mode.
 * @param {HTMLLIElement} liElement The to-do list element to be edited. 
 */


export const editTodoHTML = (liElement) => {
    liElement.classList.add('editing');
    const editTodoInput = document.createElement('input');
    editTodoInput.classList.add('edit');
    editTodoInput.value = liElement.querySelector('label').textContent;
    liElement.append(editTodoInput);
    editTodoInput.focus();

    const isClickingOutside = (e) => {
        if (!e.target.closest('.editing')) {
            liElement.classList.remove('editing');
            editTodoInput.remove();
            document.removeEventListener('click', isClickingOutside);
        }
    };

    document.addEventListener('click', isClickingOutside);

    return editTodoInput;
};