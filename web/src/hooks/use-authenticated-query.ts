import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { useQuery } from '@redwoodjs/web';
import type { DocumentNode } from 'graphql';
import { useEffect } from 'react';

export const useAuthenticatedQuery = (query: DocumentNode) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const response = useQuery(query);

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