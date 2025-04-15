import { SetURLSearchParams } from 'react-router';
import { TPaginationDirections } from '../types/common.types';

export const handlePagination = (
    offsetName: string,
    itemLimit: number,
    setSearchParams: SetURLSearchParams,
    searchParams: URLSearchParams
) => {
    return (direction: TPaginationDirections) => {
        const index = direction === 'next' ? 1 : -1;
        const currentOffset = Number(searchParams.get(offsetName) || 0);
        setSearchParams({
            [offsetName]: (currentOffset + itemLimit * index).toString(),
        });
    };
};
