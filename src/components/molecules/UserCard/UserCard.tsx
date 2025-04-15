import React from 'react';
import styles from './UserCard.module.scss';
import { IUser } from '../../../types/common.types';
import UserImage from '/user.png';

interface UserCardProps extends IUser {}

const UserCard: React.FC<UserCardProps> = (user) => {
    return (
        <section data-testid="user_card" className={styles.container}>
            <div className={styles.image_wrapper}>
                <img src={UserImage} alt="user_avatar" />
            </div>
            <h3 className={styles.username}>{user.name}</h3>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.phone}>{user.phone}</p>
        </section>
    );
};

export default UserCard;
