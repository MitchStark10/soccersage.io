import { navigate, routes } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';
import type { DocumentNode } from 'graphql';
import { useEffect } from 'react';

export const useAuthenticatedQuery = (query: DocumentNode) => {
    const response = useQuery(query);

    useEffect(() => {
        if (response.error) {
            const containsAuthError = response.error.graphQLErrors.find(
                (error) => error.extensions.code === 'UNAUTHENTICATED'
            );

            if (containsAuthError) {
                setTimeout(() => navigate(routes.login()), 0);
            }
        }
    }, [response]);

    return response;
};
