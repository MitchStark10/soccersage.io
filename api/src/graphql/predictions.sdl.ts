export const schema = gql`
    type Prediction {
        id: Int!
        userId: String!
        gameId: Int!
        teamId: Int
        prediction: String!
        Team: Team
    }

    type Query {
        predictions: [Prediction!]! @requireAuth
        myPredictions: [Prediction!]! @requireAuth
        prediction(id: Int!): Prediction @requireAuth
    }

    input CreatePredictionInput {
        userId: String!
        gameId: Int!
        teamId: Int
        prediction: String!
    }

    input UpdatePredictionInput {
        userId: String
        gameId: Int
        teamId: Int
        prediction: String
    }

    type Mutation {
        createPrediction(input: CreatePredictionInput!): Prediction!
            @requireAuth
        updatePrediction(id: Int!, input: UpdatePredictionInput!): Prediction!
            @requireAuth
        deletePrediction(id: Int!): Prediction! @requireAuth
    }
`;
