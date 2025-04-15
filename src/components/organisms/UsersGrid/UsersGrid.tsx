import React from 'react';
import styles from './UsersGrid.module.scss';
import { IUser } from '../../../types/common.types';
import UserCard from '../../molecules/UserCard/UserCard';

interface UsersGridProps {
    users: Array<IUser>;
}

const UsersGrid: React.FC<UsersGridProps> = ({ users }) => {
    const renderedUsers = users.map((user) => (
        <UserCard key={user.id} {...user} />
    ));
    return <div className={styles.container}>{renderedUsers}</div>;
};

export default UsersGrid;
