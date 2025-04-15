import { ITodo, TStatuses } from '../types/common.types';
import todoReducer, {
    addTodo,
    deleteTodo,
    editTodo,
    fetchTodos,
} from '../store/slices/todo.slice';
import { LOCAL_STORAGE_KEY_TODO } from '../constants/common.constants';

describe('Todo redux-toolkit Slice', () => {
    const mockTodo: ITodo = {
        _id: '1',
        title: 'Test Todo',
        description: 'Test description',
        status: 'not started',
    };
    beforeEach(() => {
        localStorage.clear();
    });
    describe('Add Todo', () => {
        const initialState = {
            todos: [],
        };
        test('Should save Todo in state.todos when added', () => {
            const stateAfter = todoReducer(initialState, addTodo(mockTodo));
            expect(stateAfter.todos).toContainEqual(mockTodo);
        });
        test('Should save Todo in localStorage when added', () => {
            todoReducer(initialState, addTodo(mockTodo));
            const localStorageData = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY_TODO) || '[]'
            );
            expect(localStorageData).toContainEqual(mockTodo);
        });
        test('Should add only unique _id Todos', () => {
            const stateWithOneElement = todoReducer(
                initialState,
                addTodo(mockTodo)
            );
            const stateAftre = todoReducer(
                stateWithOneElement,
                addTodo(mockTodo)
            );
            expect(stateAftre.todos.length).toBe(1);
        });
        test('Should not add Todo with missing properties', () => {
            const mockTodoWithMissingProperty = { ...mockTodo } as any;
            delete mockTodoWithMissingProperty.description;

            const stateAfter = todoReducer(
                initialState,
                addTodo(mockTodoWithMissingProperty)
            );
            expect(stateAfter.todos).not.toContainEqual(
                mockTodoWithMissingProperty
            );
        });
        test('Title, Id and Description should not be empty string', () => {
            const mockTodoWithEmptyProperties: ITodo = {
                ...mockTodo,
                _id: '',
                title: '',
                description: '',
            };
            const stateAfter = todoReducer(
                initialState,
                addTodo(mockTodoWithEmptyProperties)
            );
            expect(stateAfter.todos).not.toContainEqual(
                mockTodoWithEmptyProperties
            );
        });
    });

    describe('Delete Todo', () => {
        const initialState = {
            todos: [mockTodo],
        };
        test('Should delete Todo from state.todos', () => {
            const stateAfter = todoReducer(
                initialState,
                deleteTodo(mockTodo._id)
            );
            expect(stateAfter.todos.length).toBe(0);
        });
        test('Should delete Todo from localStorage', () => {
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TODO,
                JSON.stringify(initialState)
            );
            todoReducer(initialState, deleteTodo(mockTodo._id));
            const localStorageData = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY_TODO) || '[]'
            );
            expect(localStorageData.length).toBe(0);
        });
        test("Delete nothing if Todo doesn't exist", () => {
            const stateAfter = todoReducer(
                initialState,
                deleteTodo(mockTodo._id + 'eggregrg')
            );
            expect(stateAfter.todos.length).toBe(1);
            expect(stateAfter.todos).toContainEqual(mockTodo);
        });
    });

    describe('Update Todo', () => {
        const initialState = { todos: [mockTodo] };
        const newDescription = 'changed description';
        const newStatus: TStatuses = 'done';
        const newTitle = 'Changed title';
        const mockTodoChanged: ITodo = {
            ...mockTodo,
            description: newDescription,
            status: newStatus,
            title: newTitle,
        };
        test('Update Todo and properly save in state.todos', () => {
            const stateAfter = todoReducer(
                initialState,
                editTodo(mockTodoChanged)
            );
            expect(stateAfter.todos.length).toBe(initialState.todos.length);
            expect(stateAfter.todos).toContainEqual(mockTodoChanged);
            expect(stateAfter.todos).not.toContainEqual(mockTodo);
        });

        test('Update Todo and save in localStorage', () => {
            const stateAfter = todoReducer(
                initialState,
                editTodo(mockTodoChanged)
            );
            const localStorageData = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY_TODO) || '[]'
            );
            expect(localStorageData.length).toBe(stateAfter.todos.length);
            expect(localStorageData).toContainEqual(mockTodoChanged);
        });
        test('Update non-existing Todo', () => {
            const mockTodoChanedNonExisting: ITodo = {
                ...mockTodoChanged,
                _id: 'frgethhrtr',
            };
            const stateAfter = todoReducer(
                initialState,
                editTodo(mockTodoChanedNonExisting)
            );
            expect(stateAfter.todos.length).toBe(1);
            expect(stateAfter.todos).not.toContainEqual(
                mockTodoChanedNonExisting
            );
            expect(stateAfter.todos).toContainEqual(mockTodo);
        });
    });
    describe('Fetch Todos from LocalStorage', () => {
        const initialState = { todos: [] };
        test("Local storage is empty and/or doesn't exist", () => {
            const stateAfter = todoReducer(initialState, fetchTodos());
            expect(stateAfter.todos.length).toBe(0);
        });
        test('Local storage has array of Todos', () => {
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TODO,
                JSON.stringify([mockTodo])
            );
            const stateAfter = todoReducer(initialState, fetchTodos());
            expect(stateAfter.todos.length).toBe(1);
            expect(stateAfter.todos).toContainEqual(mockTodo);
        });
        test('Local storage is not array of Todos', () => {
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TODO,
                JSON.stringify({ message: 'Hello world' })
            );
            const storageAfter = todoReducer(initialState, fetchTodos());
            expect(storageAfter.todos.length).toBe(0);
        });
        test('Local storage has invalid Todo object', () => {
            const mockTodoInvalid = { title: 'Test', test: 'Test' };
            localStorage.setItem(
                LOCAL_STORAGE_KEY_TODO,
                JSON.stringify([mockTodoInvalid])
            );
            const stateAfter = todoReducer(initialState, fetchTodos());
            expect(stateAfter.todos.length).toBe(0);
            expect(stateAfter.todos).not.toContainEqual(mockTodoInvalid);
        });
    });
});
