import React from 'react';
import styles from './UnderlineButton.module.scss';

interface UnderlineButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    title: string;
}

const UnderlineButton: React.FC<UnderlineButtonProps> = ({
    title,
    ...props
}) => {
    return (
        <button className={styles.container} {...props}>
            {title}
        </button>
    );
};

export default UnderlineButton;
