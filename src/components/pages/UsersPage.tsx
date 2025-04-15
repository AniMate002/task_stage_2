import React, { useEffect, useState } from 'react';
import { IUser, TPaginationDirections } from '../../types/common.types';
import { useSearchParams } from 'react-router';
import { fetchUsers, searchUserByName } from '../../services/user.service';
import UsersTemplate from '../templates/Users/UsersTemplate';
import Error from '../atoms/Error/Error';
import { OFFSET, USER_QUERY } from '../../constants/common.constants';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    // SET DEFAULT searchParams if doesn't exist
    useEffect(() => {
        if (!searchParams.get(OFFSET) && !searchParams.get(USER_QUERY))
            setSearchParams({ [OFFSET]: '0' });
    }, []);

    // FETCH USER IF searchParams ARE CHANGED
    useEffect(() => {
        if (searchParams.get(OFFSET)) getAllUsers();
        else if (searchParams.get(USER_QUERY))
            getUserByName(searchParams.get(USER_QUERY) || '');
    }, [searchParams]);
    //

    // EVENT HANDLERS
    const handleUserSearchByName = (name: string) => {
        name = name.trim();
        if (!name) return getAllUsers();
        setSearchParams({ [USER_QUERY]: name });
    };

    const handlePagination = (direction: TPaginationDirections) => {
        const currentStart = Number(searchParams.get(OFFSET));
        const index = direction === 'prev' ? -1 : 1;

        if (
            (direction === 'prev' && currentStart <= 0) ||
            (direction === 'next' && currentStart >= 9)
        )
            return;

        setSearchParams({
            [OFFSET]: (currentStart + 3 * index).toString(),
        });
    };
    //

    // FETCHING FUNCTIONS WHEN USEEFFECT IS TRIGGERED
    const getAllUsers = () => {
        setIsLoading(true);
        fetchUsers(searchParams.get(OFFSET) || '')
            .then((data) => {
                if (data.type === 'error') setError(data.message);
                else setUsers(data.users);
            })
            .finally(() => setIsLoading(false));
    };
    const getUserByName = (name: string) => {
        setIsLoading(true);
        searchUserByName(name)
            .then((data) => {
                if (data.type === 'error') setError(data.message);
                else setUsers(data.users);
            })
            .finally(() => setIsLoading(false));
    };
    //

    if (error) return <Error message={error} />;
    return (
        <UsersTemplate
            isLoading={isLoading}
            users={users}
            handleUserSearchByName={handleUserSearchByName}
            handlePagination={handlePagination}
            paginationMaxOffset={9}
            paginationSearchParamName={OFFSET}
            setSearchParams={setSearchParams}
        />
    );
};

export default UsersPage;
