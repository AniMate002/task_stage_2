import { useLocation, useParams } from 'react-router';
import { Paths } from '../constants/paths';
import { useEffect, useState } from 'react';

export function useLocationRoute() {
    const [currentPathName, setCurrentPathName] = useState<string>('');
    const { id } = useParams();
    const location = useLocation();
    useEffect(() => {
        const foundPath = Object.values(Paths).find(
            (pathObject) => pathObject.path === location.pathname
        );

        if (id) return setCurrentPathName('Edit Todo');
        if (!foundPath) setCurrentPathName('Path not found');
        else setCurrentPathName(foundPath.title);
    });

    return currentPathName;
}
