import { TPaths } from '../types/router.types';

const basePaths = {
    home: {
        path: '/',
        title: 'Home',
    },
    todo: {
        path: '/todo',
        title: 'Todo',
    },
    users: {
        path: '/users',
        title: 'Users',
    },
    products: {
        path: '/products',
        title: 'Products',
    },
    notFound: {
        path: '*',
        title: 'Not found',
    },
};

export const Paths: TPaths = {
    ...basePaths,
    productsFavourites: {
        path: `${basePaths.products.path}/favourites`,
        title: 'Favourite Products',
    },
    createTodo: {
        path: `${basePaths.todo.path}/create`,
        title: 'Create Todo',
    },
    editTodo: {
        path: `${basePaths.todo.path}/:id/edit`,
        title: 'Edit Todo',
    },
};
