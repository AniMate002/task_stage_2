import { MemoryRouter } from 'react-router';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';

import todoReducer from '../store/slices/todo.slice';
import productsReducer from '../store/slices/product.slice';
import { Provider } from 'react-redux';
import { Paths } from '../constants/paths';
import { render } from '@testing-library/react';
import AppRouter from '../router/AppRouter';

export const renderWithReduxContextAndRouter = (
    ui: React.ReactNode,
    preloadedState = {},
    initialRoute = Paths.home.path
) => {
    const store = configureStore({
        reducer: {
            todos: todoReducer,
            products: productsReducer,
        },
        preloadedState,
    });
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[initialRoute]}>
                {ui}
                {/* <AppRouter /> */}
            </MemoryRouter>
        </Provider>
    );
};
