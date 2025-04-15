import React from 'react';
import styles from './TabNavigation.module.scss';
import Button from '../../atoms/Button/Button';

interface TabNavigationProps {
    tabs: Array<{ name: string; value: string }>;
    value: string;
    changeValue: (value: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
    tabs,
    value,
    changeValue,
}) => {
    const renderedTabs = tabs.map((tab) => (
        <Button
            className={tab.value === value ? styles.active_tab_button : ''}
            onClick={() => changeValue(tab.value)}
            text={tab.name}
            key={tab.value}
        />
    ));
    return <nav className={styles.container}>{renderedTabs}</nav>;
};

export default TabNavigation;
