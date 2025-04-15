import React from 'react';
import { TNavigation } from '../../../types/router.types';
import styles from './NavigationSection.module.scss';
import NavigationButton from '../../atoms/NavigationButton/NavigationButton';

interface NavigationSectionProps {
    paths: Array<TNavigation>;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ paths }) => {
    const renderedNavigationButtons = paths.map(({ path, title }) => (
        <NavigationButton key={path} path={path} title={title} />
    ));
    return <nav className={styles.container}>{renderedNavigationButtons}</nav>;
};

export default NavigationSection;
