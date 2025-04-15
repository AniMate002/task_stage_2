import React from 'react';
import styles from './Input.module.scss';

interface InputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

const Input: React.FC<InputProps> = (props) => {
    return <input className={styles.container} {...props} />;
};

export default Input;
