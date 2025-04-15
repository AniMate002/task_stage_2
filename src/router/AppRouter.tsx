import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from '../components/pages/HomePage';
import TodoPage from '../components/pages/TodoPage';
import { Paths } from '../constants/paths';
import Layout from '../components/organisms/Layout/Layout';
import CreateTodoPage from '../components/pages/CreateTodoPage';
import EditTodoPage from '../components/pages/EditTodoPage';
import UsersPage from '../components/pages/UsersPage';
import ProductsPage from '../components/pages/ProductsPage';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={Paths.home.path} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={Paths.todo.path} element={<TodoPage />} />
                <Route
                    path={Paths.createTodo.path}
                    element={<CreateTodoPage />}
                />
                <Route path={Paths.editTodo.path} element={<EditTodoPage />} />
                <Route path={Paths.users.path} element={<UsersPage />} />
                <Route path={Paths.products.path} element={<ProductsPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
