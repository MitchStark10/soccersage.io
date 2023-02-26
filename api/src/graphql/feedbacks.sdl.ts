export const schema = gql`
    type Feedback {
        id: Int!
        feedback: String!
    }

    type Query {
        feedbacks: [Feedback!]! @requireAuth
        feedback(id: Int!): Feedback @requireAuth
    }

    input CreateFeedbackInput {
        feedback: String!
    }

    input UpdateFeedbackInput {
        feedback: String
    }

    type Mutation {
        createFeedback(input: CreateFeedbackInput!): Feedback! @requireAuth
        updateFeedback(id: Int!, input: UpdateFeedbackInput!): Feedback!
            @requireAuth
        deleteFeedback(id: Int!): Feedback! @requireAuth
    }
`;
