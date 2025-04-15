import React from 'react';
import styles from './Pagination.module.scss';
import Button from '../../atoms/Button/Button';
import { TPaginationDirections } from '../../../types/common.types';
import { useSearchParams } from 'react-router';

interface PaginationProps {
    handlePagination: (direcrion: TPaginationDirections) => void;
    paginationMaxOffset: number;
    paginationSearchParamName: string;
}

const Pagination: React.FC<PaginationProps> = ({
    handlePagination,
    paginationMaxOffset,
    paginationSearchParamName,
}) => {
    const [searchParams] = useSearchParams();
    return (
        <div className={styles.container}>
            <Button
                disabled={
                    Number(searchParams.get(paginationSearchParamName)) <= 0
                }
                onClick={() => handlePagination('prev')}
                text="<- Prev"
            />
            <Button
                disabled={
                    Number(searchParams.get(paginationSearchParamName)) >=
                    paginationMaxOffset
                }
                onClick={() => handlePagination('next')}
                text="Next ->"
            />
        </div>
    );
};

export default Pagination;
