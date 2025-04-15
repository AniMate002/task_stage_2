import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, className, ...props }) => {
    return (
        <button className={`${styles.container} ${className || ''}`} {...props}>
            {text}
        </button>
    );
};

export default Button;
