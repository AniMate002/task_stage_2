import { ITodo } from '../types/common.types';

export const isValidTodo = (todo: any): todo is ITodo =>
    todo &&
    '_id' in todo &&
    'title' in todo &&
    'description' in todo &&
    'status' in todo &&
    typeof todo._id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.description === 'string' &&
    typeof todo.status === 'string';
