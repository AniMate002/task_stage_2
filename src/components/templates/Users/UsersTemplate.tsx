import React from 'react';
import UsersSearchBar from '../../molecules/UsersSearchBar/UsersSearchBar';
import UsersGrid from '../../organisms/UsersGrid/UsersGrid';
import { IUser, TPaginationDirections } from '../../../types/common.types';
import Loading from '../../atoms/Loading/Loading';
import NotFoundElement from '../../atoms/NotFoundElement/NotFoundElement';
import Pagination from '../../molecules/Pagination/Pagination';
import { SetURLSearchParams } from 'react-router';

interface UsersTemplateProps {
    users: Array<IUser>;
    isLoading: boolean;
    handleUserSearchByName: (name: string) => void;
    handlePagination: (direcrion: TPaginationDirections) => void;
    paginationMaxOffset: number;
    paginationSearchParamName: string;
    setSearchParams: SetURLSearchParams;
}

const UsersTemplate: React.FC<UsersTemplateProps> = ({
    users,
    isLoading,
    handleUserSearchByName,
    handlePagination,
    paginationMaxOffset,
    paginationSearchParamName,
    setSearchParams,
}) => {
    return (
        <div>
            <UsersSearchBar
                setSearchParams={setSearchParams}
                handleUserSearchByName={handleUserSearchByName}
            />
            {isLoading && <Loading />}
            {!isLoading && <UsersGrid users={users} />}
            {users.length === 0 && !isLoading ? (
                <NotFoundElement text="Users were not found" />
            ) : null}
            {isLoading || users.length === 0 ? null : (
                <Pagination
                    handlePagination={handlePagination}
                    paginationMaxOffset={paginationMaxOffset}
                    paginationSearchParamName={paginationSearchParamName}
                />
            )}
        </div>
    );
};

export default UsersTemplate;
