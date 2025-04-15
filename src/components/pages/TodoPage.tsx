import React, { useCallback, useEffect } from 'react';
import TodoTemplate from '../templates/Todo/TodoTemplate';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import {
    editTodo,
    deleteTodo,
    fetchTodos,
} from '../../store/slices/todo.slice';
import { ITodo, TStatuses } from '../../types/common.types';
import { useNavigate } from 'react-router';
import { Paths } from '../../constants/paths';

const TodoPage: React.FC = () => {
    const { todos } = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // GET TODOS ON FIRST RENDER
    useEffect(() => {
        dispatch(fetchTodos());
    }, []);
    const handleChangeStatus = useCallback(
        (todo: ITodo) => {
            const nextStatus: TStatuses =
                todo.status === 'done'
                    ? 'not started'
                    : todo.status === 'not started'
                    ? 'in progress'
                    : 'done';
            dispatch(editTodo({ ...todo, status: nextStatus }));
        },
        [dispatch]
    );
    const handleDeteleTodo = useCallback(
        (id: string) => {
            dispatch(deleteTodo(id));
        },
        [dispatch]
    );
    const handleNavigateEditTodo = useCallback(
        (id: string) => {
            navigate(Paths.todo.path + `/${id}/edit`);
        },
        [navigate]
    );
    return (
        <TodoTemplate
            todos={todos}
            handleChangeStatus={handleChangeStatus}
            handleDeteleTodo={handleDeteleTodo}
            handleNavigateEditTodo={handleNavigateEditTodo}
        />
    );
};

export default TodoPage;
