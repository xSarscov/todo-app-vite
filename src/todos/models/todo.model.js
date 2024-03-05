import {v4 as uuid} from 'uuid';

export class Todo {
    /**
     * @param {String} description A description for the task
     */
    constructor(description) {
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}