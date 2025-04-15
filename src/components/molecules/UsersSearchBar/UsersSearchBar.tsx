import React, { useState } from 'react';
import styles from './UsersSearchBar.module.scss';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import { OFFSET } from '../../../constants/common.constants';
import { SetURLSearchParams } from 'react-router';

interface UsersSearchBarProps {
    handleUserSearchByName: (name: string) => void;
    setSearchParams: SetURLSearchParams;
}

const UsersSearchBar: React.FC<UsersSearchBarProps> = ({
    handleUserSearchByName,
    setSearchParams,
}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleUserSearchByName(searchQuery);
        // setSearchQuery('');
    };
    const handleFormReset = () => {
        handleUserSearchByName('');
        setSearchQuery('');
        setSearchParams({ [OFFSET]: '0' });
    };

    return (
        <form
            onReset={handleFormReset}
            onSubmit={handleFormSubmit}
            className={styles.container}
        >
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search for users"
            />
            <Button type="submit" text="Search" />
            {searchQuery && <Button type="reset" text="Reset filter" />}
        </form>
    );
};

export default UsersSearchBar;
