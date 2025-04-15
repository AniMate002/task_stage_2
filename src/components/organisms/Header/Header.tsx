import React from 'react';
import NavigationSection from '../../molecules/NavigationSection/NavigationSection';
import { Paths } from '../../../constants/paths';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header data-testid="main_header" className={styles.container}>
            <NavigationSection
                paths={[Paths.home, Paths.todo, Paths.users, Paths.products]}
            />
        </header>
    );
};

export default Header;
