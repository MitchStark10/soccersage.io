import { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import type { DocumentNode } from 'graphql';

import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';

export const useAuthenticatedQuery = <T extends {} = {}>(
    query: DocumentNode,
    options?: { variables: unknown }
) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const response = useQuery<T>(query, options);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate(routes.login());
        }
    }, [isAuthenticated, authLoading]);

    useEffect(() => {
        if (response.error) {
            console.log('Recevied error', response);
            const containsAuthError = response.error.graphQLErrors.find(
                (error) => error.extensions?.code === 'UNAUTHENTICATED'
            );

            if (containsAuthError) {
                setTimeout(() => navigate(routes.login()), 0);
            }
        }
    }, [response]);

    return response;
};
