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
export const useUser = () => {};
