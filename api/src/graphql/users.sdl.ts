export const schema = gql`
    type User {
        id: Int!
        email: String!
        hashedPassword: String!
        salt: String!
        resetToken: String
        resetTokenExpiresAt: DateTime
        role: String!
        Prediction: [Prediction]!
    }

    type Query {
        users: [User!]! @requireAuth
        user(id: Int!): User @requireAuth
    }

    input CreateUserInput {
        email: String!
        hashedPassword: String!
        salt: String!
        resetToken: String
        resetTokenExpiresAt: DateTime
        role: String!
    }

    input UpdateUserInput {
        email: String
        hashedPassword: String
        salt: String
        resetToken: String
        resetTokenExpiresAt: DateTime
        role: String
    }

    type Mutation {
        createUser(input: CreateUserInput!): User! @requireAuth
        updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
        deleteUser(id: Int!): User! @requireAuth
    }
`;
