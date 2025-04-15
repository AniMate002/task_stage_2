import React from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps
    extends React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > {}

const Textarea: React.FC<TextareaProps> = (props) => {
    return <textarea className={styles.container} {...props}></textarea>;
};

export default Textarea;
