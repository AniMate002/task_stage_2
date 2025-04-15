import React from 'react';
import styles from './Title.module.scss';

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <h1 data-testid='page_title' className={styles.container}>
            {title}
        </h1>
    );
};

export default Title;
