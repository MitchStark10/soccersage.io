import { useEffect, useState } from 'react';

import { useAuth as useRedwoodAuth } from '@redwoodjs/auth';

export const useAuth = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const { loading, ...rest } = useRedwoodAuth();

    useEffect(() => {
        if (!loading && !isInitialized) {
            setIsInitialized(true);
        }
    }, [loading, isInitialized]);

    return { loading, ...rest, isInitialized };
};
