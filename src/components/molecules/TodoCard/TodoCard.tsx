import React from 'react';
import { ITodo } from '../../../types/common.types';
import styles from './TodoCard.module.scss';
import UnderlineButton from '../../atoms/UnderlineButton/UnderlineButton';

interface TodoCardProps extends ITodo {
    handleChangeStatus: (todo: ITodo) => void;
    handleDeteleTodo: (id: string) => void;
    handleNavigateEditTodo: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
    _id,
    description,
    status,
    title,
    handleChangeStatus,
    handleDeteleTodo,
    handleNavigateEditTodo,
}) => {
    const color =
        status === 'done' ? 'green' : status === 'in progress' ? 'blue' : 'red';
    const handleChangeStatusClick = () => {
        handleChangeStatus({ _id, title, description, status });
    };
    const handleDeleteTodoClick = () => {
        handleDeteleTodo(_id);
    };
    const handleNavigateEditTodoClick = () => {
        handleNavigateEditTodo(_id);
    };
    return (
        <section data-testid={'todo_card'} className={styles.container}>
            <button
                onClick={handleChangeStatusClick}
                style={{ backgroundColor: color }}
                className={styles.status}
            >
                {status}
            </button>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className={styles.editAndDeleteContainer}>
                <UnderlineButton
                    onClick={handleNavigateEditTodoClick}
                    title="Edit"
                />
                <UnderlineButton
                    onClick={handleDeleteTodoClick}
                    title="Delete"
                />
            </div>
        </section>
    );
};

export default TodoCard;
