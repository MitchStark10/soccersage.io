export const schema = gql`
    type Prediction {
        id: Int!
        userId: Int!
        gameId: Int!
        teamId: Int
        prediction: String!
        team: Team
        game: Game!
        user: User
    }

    type StandingsData {
        userId: String!
        username: String!
        email: String!
        score: Int!
        correctWins: Int!
        correctTies: Int!
    }

    type StandingsResult {
        userIdRankings: [StandingsData!]!
    }

    type MyPredictionsResult {
        streakCount: Int!
        predictions: [Prediction!]!
    }

    type Query {
        predictions: [Prediction!]! @requireAuth
        myPredictions: MyPredictionsResult @requireAuth
        prediction(id: Int!): Prediction @requireAuth
        standings(seasonId: Int!): StandingsResult @skipAuth
    }

    input CreatePredictionInput {
        userId: Int!
        gameId: Int!
        seasonId: Int!
        teamId: Int
        prediction: String!
    }

    input UpdatePredictionInput {
        userId: Int
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
