import { test } from 'vitest';
import TodoPage from '../components/pages/TodoPage';
import { LOCAL_STORAGE_KEY_TODO } from '../constants/common.constants';
import { renderWithReduxContextAndRouter } from '../helpers/wrapperTest.helper';
import { screen } from '@testing-library/dom';
import { ITodo } from '../types/common.types';

describe('Todo Page', () => {
    const mockTodos: Array<ITodo> = [
        {
            _id: 'b73addec-5825-4f5c-af56-33a9861138eb',
            title: 'Buy groceries',
            description: 'Milk, eggs, and bread',
            status: 'not started',
        },
        {
            _id: '4dd9ef40-3490-4caa-958d-8f429bbad63d',
            title: 'Finish project',
            description: 'Complete the React app',
            status: 'in progress',
        },
        {
            _id: '93c6f97b-82a3-40c8-8b26-37d6aca47a65',
            title: 'Read a book',
            description: "Finish reading 'The Pragmatic Programmer'",
            status: 'done',
        },
    ];
    describe('No Todos on first render', () => {
        beforeEach(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY_TODO, '[]');
        });
        test('Create Todo button is in the document', () => {
            renderWithReduxContextAndRouter(<TodoPage />);
            const button = screen.queryByRole('button', {
                name: /create todo/i,
            });
            expect(button).toBeInTheDocument();
        });
        test('notFoundElement is in the document when localStorage is empty', () => {
            renderWithReduxContextAndRouter(<TodoPage />);
            const notFoundElement = screen.queryByText(/No Todos found/i);
            expect(notFoundElement).toBeInTheDocument();
        });
    });
    describe('Display Todo on first render', () => {
        test('One Todo card is in the document when one todo is in the localStorage', () => {
            const selectedMockTodo = mockTodos[0];
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TODO,
                JSON.stringify([selectedMockTodo])
            );
            renderWithReduxContextAndRouter(<TodoPage />);
            const todoCard = screen.queryByTestId('todo_card');
            expect(todoCard).toBeInTheDocument();
            expect(todoCard).toHaveTextContent(selectedMockTodo.description);
            expect(todoCard).toHaveTextContent(selectedMockTodo.title);
            expect(todoCard).toHaveTextContent(selectedMockTodo.status);
        });
        test('Multuple Todo cards is in the document when Multuple todos is in the localStorage', () => {
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TODO,
                JSON.stringify(mockTodos)
            );
            renderWithReduxContextAndRouter(<TodoPage />);
            const todoCards = screen.queryAllByTestId('todo_card');
            expect(todoCards.length).toBe(mockTodos.length);
        });
    });

    describe('Todo Status Color', () => {
        beforeEach(() => {
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TODO,
                JSON.stringify(mockTodos)
            );
        });

        test('Not started is Red', () => {
            const selectedMockTodo = mockTodos[0];
            renderWithReduxContextAndRouter(<TodoPage />);
            const status = selectedMockTodo.status;

            const statusComponent = screen.queryByText(status);
            expect(statusComponent).toHaveStyle(
                'background-color: rgb(255, 0, 0)'
            );
        });

        test('In progress is Blue', () => {
            const selectedMockTodo = mockTodos[1];
            renderWithReduxContextAndRouter(<TodoPage />);
            const status = selectedMockTodo.status;

            const statusComponent = screen.queryByText(status);
            expect(statusComponent).toHaveStyle(
                'background-color: rgb(0, 0, 255)'
            );
        });

        test('Completed is Green', () => {
            const selectedMockTodo = mockTodos[2];
            renderWithReduxContextAndRouter(<TodoPage />);
            const status = selectedMockTodo.status;

            const statusComponent = screen.queryByText(status);
            expect(statusComponent).toHaveStyle(
                'background-color: rgb(0, 128, 0)'
            );
        });
    });
});
