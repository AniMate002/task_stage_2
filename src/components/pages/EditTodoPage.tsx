import React, { useCallback, useEffect, useState } from 'react';
import CreateTodoTemplate from '../templates/CreateTodo/FormTodoTemplate';
import { ITodo } from '../../types/common.types';
import { editTodo } from '../../store/slices/todo.slice';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import { Paths } from '../../constants/paths';

const EditTodoPage: React.FC = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState<ITodo | null>(null);
    const { todos } = useAppSelector((state) => state.todos);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleEditTodo = useCallback(
        (todo: ITodo) => {
            dispatch(editTodo(todo));
            navigate(Paths.todo.path);
        },
        [dispatch, navigate]
    );
    useEffect(() => {
        const foundTodo = todos.find((todo) => todo._id === id);
        if (foundTodo) setTodo(foundTodo);
        else setTodo(null);
    }, [id, dispatch, todo, todos]);
    if (!id || !todo) return <h1>Todo not found</h1>;
    return (
        <CreateTodoTemplate
            mode="edit"
            handleEditTodo={handleEditTodo}
            todo={todo}
        />
    );
};

export default EditTodoPage;
