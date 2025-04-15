import React from 'react';
import { ITodo } from '../../../types/common.types';
import TodoCard from '../../molecules/TodoCard/TodoCard';
import styles from './TodoGrid.module.scss';

interface TodoGridProps {
    todos: Array<ITodo>;
    handleChangeStatus: (todo: ITodo) => void;
    handleDeteleTodo: (id: string) => void;
    handleNavigateEditTodo: (id: string) => void;
}

const TodoGrid: React.FC<TodoGridProps> = ({
    todos,
    handleChangeStatus,
    handleDeteleTodo,
    handleNavigateEditTodo,
}) => {
    const renderedTodos = todos.map((todo) => (
        <TodoCard
            handleChangeStatus={handleChangeStatus}
            handleDeteleTodo={handleDeteleTodo}
            handleNavigateEditTodo={handleNavigateEditTodo}
            key={todo._id}
            {...todo}
        />
    ));
    return <div className={styles.container}>{renderedTodos}</div>;
};

export default TodoGrid;
