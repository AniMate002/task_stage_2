import React, { useState } from 'react';
import styles from './FormTodoTemplate.module.scss';
import Input from '../../atoms/Input/Input';
import Textarea from '../../atoms/Textarea/Textarea';
import Button from '../../atoms/Button/Button';
import { ITodo } from '../../../types/common.types';

type CreateTodoTemplateProps =
    | {
          mode: 'create';
          handleCreateTodo: (title: string, description: string) => void;
      }
    | { mode: 'edit'; handleEditTodo: (todo: ITodo) => void; todo: ITodo };

const CreateTodoTemplate: React.FC<CreateTodoTemplateProps> = (props) => {
    const isEdit = props.mode === 'edit';
    const [title, setTitle] = useState<string>(isEdit ? props.todo.title : '');
    const [description, setDescription] = useState<string>(
        isEdit ? props.todo.description : ''
    );
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;
        if (isEdit)
            props.handleEditTodo({
                _id: props.todo._id,
                title: title.trim(),
                description: description.trim(),
                status: props.todo.status,
            });
        else props.handleCreateTodo(title.trim(), description.trim());
    };

    return (
        <form onSubmit={handleFormSubmit} className={styles.container}>
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
            />
            <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Description"
            />
            <Button type="submit" text={isEdit ? 'Edit' : 'Create'} />
        </form>
    );
};

export default CreateTodoTemplate;
