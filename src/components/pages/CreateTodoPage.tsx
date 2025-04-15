import React, { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/store.hooks';
import { addTodo } from '../../store/slices/todo.slice';
import CreateTodoTemplate from '../templates/CreateTodo/FormTodoTemplate';
import { useNavigate } from 'react-router';
import { Paths } from '../../constants/paths';

const CreateTodoPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleCrateTodo = useCallback(
        (title: string, description: string) => {
            dispatch(
                addTodo({
                    _id: Date.now().toString(),
                    description,
                    title,
                    status: 'not started',
                })
            );
            navigate(Paths.todo.path);
        },
        [dispatch, navigate]
    );

    return (
        <CreateTodoTemplate mode="create" handleCreateTodo={handleCrateTodo} />
    );
};

export default CreateTodoPage;
