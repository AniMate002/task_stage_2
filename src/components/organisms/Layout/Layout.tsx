import React from 'react';
import { useLocationRoute } from '../../../hooks/location.hooks';
import Title from '../../atoms/Title/Title';
import { Outlet } from 'react-router';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
    const pathName = useLocationRoute();

    return (
        <div>
            <Header />
            <Title title={pathName} />
            <div className={styles.container}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
