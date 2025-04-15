import { BASE_URL_JSPLACEHOLDER } from '../constants/common.constants';
import { IUser, TResponse } from '../types/common.types';

export const fetchUsers = async (start: string): Promise<TResponse<IUser>> => {
    try {
        const res = await fetch(
            BASE_URL_JSPLACEHOLDER + `/users?_start=${start}&_limit=3`
        );
        if (!res.ok) throw new Error(res.statusText);
        const users = await res.json();
        return { type: 'success', users };
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Unknown error while fetching users';
        return { type: 'error', message };
    }
};

export const searchUserByName = async (
    name: string
): Promise<TResponse<IUser>> => {
    try {
        const res = await fetch(BASE_URL_JSPLACEHOLDER + `/users?name=${name}`);
        if (!res.ok) throw new Error(res.statusText);
        const users = await res.json();
        return { type: 'success', users };
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Unknown error while fetching users';
        return { type: 'error', message };
    }
};
