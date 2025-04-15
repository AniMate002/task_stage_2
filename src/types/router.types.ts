export type TPathNames =
    | 'home'
    | 'todo'
    | 'users'
    | 'products'
    | 'productsFavourites'
    | 'createTodo'
    | 'editTodo'
    | 'users'
    | 'notFound';

export type TNavigation = {
    path: string;
    title: string;
};

export type TPaths = Record<TPathNames, TNavigation>;
