import { vi } from 'vitest';

vi.mock('../services/user.service', () => ({
    fetchUsers: vi.fn(),
    searchUserByName: vi.fn(),
}));

import * as userService from '../services/user.service';
import { renderWithReduxContextAndRouter } from '../helpers/wrapperTest.helper';
import UsersPage from '../components/pages/UsersPage';
import { fireEvent, screen } from '@testing-library/react';
import { IUser } from '../types/common.types';
import { Paths } from '../constants/paths';

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

describe('Users Page', () => {
    beforeEach(() => {
        (userService.fetchUsers as ReturnType<typeof vi.fn>).mockResolvedValue({
            type: 'success',
            users: mockUsers,
        });

        (
            userService.searchUserByName as ReturnType<typeof vi.fn>
        ).mockResolvedValue({
            type: 'success',
            users: [],
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('UI is in the document', () => {
        test('Search Bar is in the document', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            expect(
                await screen.findByPlaceholderText(/search for users/i)
            ).toBeInTheDocument();
        });

        test('Search Button is in the document', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            expect(
                await screen.findByRole('button', { name: /search/i })
            ).toBeInTheDocument();
        });

        test('Loading Element is in the document while loading users', async () => {
            (
                userService.fetchUsers as ReturnType<typeof vi.fn>
            ).mockImplementation(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve({ type: 'success', users: mockUsers });
                        }, 100);
                    })
            );
            renderWithReduxContextAndRouter(<UsersPage />);
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
        });

        test('Pagination is hidden while loading users', async () => {
            (
                userService.fetchUsers as ReturnType<typeof vi.fn>
            ).mockImplementation(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve({ type: 'success', users: mockUsers });
                        }, 100);
                    })
            );
            renderWithReduxContextAndRouter(<UsersPage />);
            expect(
                screen.queryByTestId('pagination_controls')
            ).not.toBeInTheDocument();
        });
    });

    describe('Search Bar logic', () => {
        test('Value in input can be changed', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            const input = await screen.findByPlaceholderText(
                /search for users/i
            );
            fireEvent.change(input, { target: { value: 'Alex' } });
            expect((input as HTMLInputElement).value).toBe('Alex');
        });

        test('Display Reset filter button when Search bar is not empty', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            const input = await screen.findByPlaceholderText(
                /search for users/i
            );
            fireEvent.change(input, { target: { value: 'Alex' } });
            const resetButton = await screen.findByRole('button', {
                name: /reset filter/i,
            });
            expect(resetButton).toBeInTheDocument();
        });
    });

    describe('Users fetch logic', () => {
        test('Users are displayed on success', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            const cards = await screen.findAllByTestId('user_card');
            expect(cards).toHaveLength(mockUsers.length);
        });

        test('Displays error when fetch fails', async () => {
            (
                userService.fetchUsers as ReturnType<typeof vi.fn>
            ).mockResolvedValue({
                type: 'error',
                message: 'Something went wrong',
            });

            renderWithReduxContextAndRouter(<UsersPage />);
            const errorText = await screen.findByText(/something went wrong/i);
            expect(errorText).toBeInTheDocument();
        });

        test('Displays notFound message when users array is empty', async () => {
            (
                userService.fetchUsers as ReturnType<typeof vi.fn>
            ).mockResolvedValue({
                type: 'success',
                users: [],
            });

            renderWithReduxContextAndRouter(<UsersPage />);

            const userCards = screen.queryAllByTestId('user_card');
            expect(userCards.length).toBe(0);

            const notFoundElement = await screen.findByText(
                /Users were not found/i
            );
            expect(notFoundElement).toBeInTheDocument();
        });
    });

    describe('Search by name logic', () => {
        test('Reuturns one user on success if found', async () => {
            (
                userService.searchUserByName as ReturnType<typeof vi.fn>
            ).mockResolvedValue({
                type: 'success',
                users: [mockUsers[0]],
            });

            renderWithReduxContextAndRouter(<UsersPage />);

            const input = screen.getByPlaceholderText(/Search for users/i);
            const button = screen.getByRole('button', { name: /Search/i });
            fireEvent.change(input, { target: { value: 'Alex' } });
            fireEvent.click(button);

            expect(userService.searchUserByName).toHaveBeenCalledWith('Alex');

            const userCard = await screen.findAllByTestId('user_card');
            expect(userCard).toHaveLength(1);
        });
        test('Returns notFound message when user was not found', async () => {
            (
                userService.searchUserByName as ReturnType<typeof vi.fn>
            ).mockResolvedValue({
                type: 'success',
                users: [],
            });

            renderWithReduxContextAndRouter(<UsersPage />);

            const input = screen.getByPlaceholderText(/Search for users/i);
            const button = screen.getByRole('button', { name: /Search/i });
            fireEvent.change(input, { target: { value: 'Alex' } });
            fireEvent.click(button);

            expect(userService.searchUserByName).toHaveBeenCalledWith('Alex');

            const userCard = screen.queryAllByTestId('user_card');
            expect(userCard).toHaveLength(0);

            const notFoundElement = await screen.findByText(
                /Users were not found/i
            );
            expect(notFoundElement).toBeInTheDocument();
        });
        test('Disaplay error message on crash/bad response', async () => {
            (
                userService.searchUserByName as ReturnType<typeof vi.fn>
            ).mockResolvedValue({
                type: 'error',
                message: 'Something went wrong',
            });

            renderWithReduxContextAndRouter(<UsersPage />);

            const input = screen.getByPlaceholderText(/Search for users/i);
            const button = screen.getByRole('button', { name: /Search/i });
            fireEvent.change(input, { target: { value: 'Alex' } });
            fireEvent.click(button);

            expect(userService.searchUserByName).toHaveBeenCalledWith('Alex');

            const userCard = screen.queryAllByTestId('user_card');
            expect(userCard).toHaveLength(0);

            const errorMessage = await screen.findByText(
                /Something went wrong/i
            );
            expect(errorMessage).toBeInTheDocument();
        });
    });

    describe('Pagination logic', () => {
        test('Pagination is displayed after users fetched successfully', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            const prev = await screen.findByRole('button', { name: /Prev/i });
            const next = await screen.findByRole('button', { name: /Next/i });
            expect(prev).toBeInTheDocument();
            expect(next).toBeInTheDocument();
        });
        test('Prev button is disabled when offset=0', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            const prev = await screen.findByRole('button', { name: /Prev/i });
            expect(prev).toBeDisabled();
        });
        test('Next button is disabled when offset=max', async () => {
            renderWithReduxContextAndRouter(
                <UsersPage />,
                {},
                Paths.users.path + '?offset=20'
            );
            const next = await screen.findByRole('button', { name: /Next/i });
            expect(next).toBeDisabled();
        });
        test('Next and Prev are enabled when there are users for both sides', async () => {
            renderWithReduxContextAndRouter(
                <UsersPage />,
                {},
                Paths.users.path + '?offset=1'
            );
            const prev = await screen.findByRole('button', { name: /Prev/i });
            const next = await screen.findByRole('button', { name: /Next/i });
            expect(prev).toBeEnabled();
            expect(next).toBeEnabled();
        });
        test('Pagination click calls user fetch', async () => {
            renderWithReduxContextAndRouter(<UsersPage />);
            const next = await screen.findByRole('button', { name: /Next/i });
            fireEvent.click(next);
            expect(userService.fetchUsers).toHaveBeenCalled();
        });
    });
});
