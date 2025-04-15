import { TAB_ALL, TAB_FAVOURITE } from '../constants/common.constants';

export type TStatuses = 'in progress' | 'not started' | 'done';

// TODO
export interface ITodo {
    _id: string;
    title: string;
    description: string;
    status: TStatuses;
}

// USER
export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

// PAGINATION
export type TPaginationDirections = 'next' | 'prev';

// PRODUCT
export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export type TTabSelect = typeof TAB_ALL | typeof TAB_FAVOURITE;

// GENERIC RESPONSE
export type TResponse<T> =
    | { type: 'success'; users: Array<T> }
    | { type: 'error'; message: string };
