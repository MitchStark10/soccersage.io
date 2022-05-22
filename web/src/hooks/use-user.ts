import { useQuery } from '@redwoodjs/web';
import { User } from 'types/graphql';

const QUERY = gql`
    query FindUser($id: Int!) {
        user(id: $id) {
            id
            email
            username
            status
            sessionCookie
        }
    }
`;

// TODO: Implement the session cookie
export const useUser = () => {
    const result = useQuery<
        Pick<User, 'id' | 'email' | 'username' | 'status' | 'sessionCookie'>
    >(QUERY, {
        variables: { id: 1 },
    });

    return result;
};
