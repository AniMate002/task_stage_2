import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../types/common.types';
import { LOCAL_STORAGE_KEY_TODO } from '../../constants/common.constants';
import {
    fetchDataFromLocalStorage,
    saveDataToLocalStorage,
} from '../../helpers/localStorage.helper';
import { isValidTodo } from '../../helpers/checkValid.helper';

interface IInitialState {
    todos: Array<ITodo>;
}

const initialState: IInitialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        fetchTodos: (state) => {
            const receivedTodos = fetchDataFromLocalStorage<Array<ITodo>>(
                LOCAL_STORAGE_KEY_TODO
            );
            if (!receivedTodos) return;
            if (!Array.isArray(receivedTodos))
                saveDataToLocalStorage(LOCAL_STORAGE_KEY_TODO, '[]');
            else {
                const validTodos = receivedTodos.filter(isValidTodo);
                state.todos = validTodos;
                saveDataToLocalStorage(LOCAL_STORAGE_KEY_TODO, validTodos);
            }
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            if (!isValidTodo(action.payload)) return;
            if (
                action.payload.title.length === 0 ||
                action.payload._id.length === 0 ||
                action.payload.description.length === 0
            )
                return;
            const foundElement = state.todos.findIndex(
                (todo) => todo._id === action.payload._id
            );
            if (foundElement !== -1) return;
            state.todos.push(action.payload);
            saveDataToLocalStorage(LOCAL_STORAGE_KEY_TODO, state.todos);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(
                (todo) => todo._id !== action.payload
            );
            saveDataToLocalStorage(LOCAL_STORAGE_KEY_TODO, state.todos);
        },
        editTodo: (state, action: PayloadAction<ITodo>) => {
            const foundIndexTodo = state.todos.findIndex(
                (todo) => todo._id === action.payload._id
            );
            if (foundIndexTodo === -1) return;
            state.todos[foundIndexTodo] = action.payload;
            saveDataToLocalStorage(LOCAL_STORAGE_KEY_TODO, state.todos);
        },
    },
});

export const { addTodo, deleteTodo, editTodo, fetchTodos } = todoSlice.actions;
export default todoSlice.reducer;
