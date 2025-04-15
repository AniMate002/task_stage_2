import React from 'react';
import Button from '../../atoms/Button/Button';
import { useNavigate } from 'react-router';
import { Paths } from '../../../constants/paths';
import { ITodo } from '../../../types/common.types';
import NotFoundElement from '../../atoms/NotFoundElement/NotFoundElement';
import styles from './TodoTemplate.module.scss';
import TodoGrid from '../../organisms/TodoGrid/TodoGrid';

interface TodoTemplateProps {
    todos: Array<ITodo>;
    handleChangeStatus: (todo: ITodo) => void;
    handleDeteleTodo: (id: string) => void;
    handleNavigateEditTodo: (id: string) => void;
}

const TodoTemplate: React.FC<TodoTemplateProps> = ({
    todos,
    handleChangeStatus,
    handleDeteleTodo,
    handleNavigateEditTodo,
}) => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Button
                onClick={() => navigate(Paths.createTodo.path)}
                text="Create Todo +"
            />
            {todos.length === 0 ? (
                <NotFoundElement text="No Todos found" />
            ) : (
                <TodoGrid
                    handleChangeStatus={handleChangeStatus}
                    handleDeteleTodo={handleDeteleTodo}
                    todos={todos}
                    handleNavigateEditTodo={handleNavigateEditTodo}
                />
            )}
        </div>
    );
};

export default TodoTemplate;
