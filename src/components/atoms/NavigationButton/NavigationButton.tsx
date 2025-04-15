import React from 'react';
import { Link } from 'react-router';
import styles from './NavigationButton.module.scss';
import { TNavigation } from '../../../types/router.types';

interface NavigationButtonProps extends TNavigation {}

const NavigationButton: React.FC<NavigationButtonProps> = ({ path, title }) => {
    return (
        <Link className={styles.container} to={path}>
            {title}
        </Link>
    );
};

export default NavigationButton;
