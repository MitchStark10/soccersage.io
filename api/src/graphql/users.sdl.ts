export const schema = gql`
    type User {
        id: Int!
        email: String!
        username: String!
        status: String!
        sessionCookie: String!
        Prediction: [Prediction]!
    }

    type Query {
        users: [User!]! @requireAuth
        user(id: Int!): User @requireAuth
    }

    input CreateUserInput {
        email: String!
        username: String!
        status: String!
        sessionCookie: String!
    }

    input UpdateUserInput {
        email: String
        username: String
        status: String
        sessionCookie: String
    }

    type Mutation {
        createUser(input: CreateUserInput!): User! @requireAuth
        updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
        deleteUser(id: Int!): User! @requireAuth
    }
`;
