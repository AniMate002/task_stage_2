import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todo.slice.ts';
import productsReducer from './slices/product.slice.ts';

export default configureStore({
    reducer: {
        todos: todosReducer,
        products: productsReducer,
    },
});
