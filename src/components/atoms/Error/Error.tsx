import React from 'react';
import styles from './Error.module.scss';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return <p className={styles.container}>{message}</p>;
};

export default Error;
