import { fetchUsers, searchUserByName } from '../services/user.service';
import { IUser } from '../types/common.types';
import { vi } from 'vitest';

const mockUsers: Array<IUser> = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '-37.3159',
                lng: '81.1496',
            },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
        },
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
                lat: '-43.9509',
                lng: '-34.4618',
            },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
        },
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        address: {
            street: 'Douglas Extension',
            suite: 'Suite 847',
            city: 'McKenziehaven',
            zipcode: '59590-4157',
            geo: {
                lat: '-68.6102',
                lng: '-47.0653',
            },
        },
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        company: {
            name: 'Romaguera-Jacobson',
            catchPhrase: 'Face to face bifurcated interface',
            bs: 'e-enable strategic applications',
        },
    },
];

describe('User Service', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });
    describe('Basic user fetch', () => {
        test('fetchUsers returns users on success', async () => {
            (global.fetch as ReturnType<typeof vi.fn>).mockReturnValue({
                ok: true,
                json: async () => mockUsers,
            });

            const response = await fetchUsers('0');
            expect(response.type).toBe('success');
            if (response.type === 'success')
                expect(response.users).toEqual(mockUsers);
        });
        test('fetchUsers crashed returns message', async () => {
            const messageError = 'Failed to fetch';
            (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
                new Error(messageError)
            );
            const response = await fetchUsers('0');
            expect(response.type).toBe('error');
            if (response.type === 'error')
                expect(response.message).toBe(messageError);
        });
        test('fetchUsers returns error message from statusText on bad response', async () => {
            const messageError = 'Internal server error';

            (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: false,
                status: 500,
                statusText: messageError,
            });

            const response = await fetchUsers('0');

            expect(response.type).toBe('error');
            if (response.type === 'error') {
                expect(response.message).toBe(messageError);
            }
        });
    });

    describe('User Pagination', () => {
        test('Start argument with number type is pasted into URI returns paginated users', async () => {
            const startValue = 10;
            (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: true,
                json: async () => mockUsers,
            });
            const response = await fetchUsers(startValue.toString());
            expect(response.type).toBe('success');
            expect(fetch).toHaveBeenCalledWith(
                `https://jsonplaceholder.typicode.com/users?_start=${startValue}&_limit=3`
            );
        });
        test('Start argument with invalid type is pasted into URI returns all users', async () => {
            const startValueInvalid = 'frljgkerh';
            (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: true,
                json: async () => mockUsers,
            });
            const response = await fetchUsers(startValueInvalid);
            expect(response.type).toBe('success');
            expect(fetch).toHaveBeenCalledWith(
                `https://jsonplaceholder.typicode.com/users?_start=${startValueInvalid}&_limit=3`
            );
        });
    });

    describe('Search User by name', () => {
        test('Name search param is pasted in URI', async () => {
            const name = 'Alex';
            (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: true,
                json: async () => mockUsers,
            });
            const response = await searchUserByName(name);

            expect(response.type).toBe('success');
            expect(fetch).toHaveBeenCalledWith(
                `https://jsonplaceholder.typicode.com/users?name=${name}`
            );
        });
        test('Name search returns error message on crash', async () => {
            const messageError = 'Failed to fetch';
            (fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
                new Error(messageError)
            );
            const response = await searchUserByName('Alex');
            expect(response.type).toBe('error');
            if (response.type === 'error')
                expect(response.message).toBe(messageError);
        });
        test('Name search return statusText on server/client error', async () => {
            const messageError = 'Internal server error';
            (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: false,
                status: 500,
                statusText: messageError,
            });
            const response = await searchUserByName('Alex');
            expect(response.type).toBe('error');
            if (response.type === 'error')
                expect(response.message).toBe(messageError);
        });
        test('Name search returns array with one user on success if found', async () => {
            (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: true,
                status: 200,
                json: () => [mockUsers[0]],
            });
            const response = await searchUserByName('Alex');
            expect(response.type).toBe('success');
            if (response.type === 'success') {
                expect(response.users.length).toBe(1);
                expect(response.users).toContainEqual(mockUsers[0]);
            }
        });
        test('Name search returns empty array with on success if not found', async () => {
            (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: true,
                status: 200,
                json: () => [],
            });
            const response = await searchUserByName('Alex');
            expect(response.type).toBe('success');
            if (response.type === 'success') {
                expect(response.users.length).toBe(0);
            }
        });
    });
});
