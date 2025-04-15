import React from 'react';
import styles from './NotFoundElement.module.scss';

interface NotFoundElementProps {
    text: string;
}

const NotFoundElement: React.FC<NotFoundElementProps> = ({ text }) => {
    return <p className={styles.container}>{text}</p>;
};

export default NotFoundElement;
