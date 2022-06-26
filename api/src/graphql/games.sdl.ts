export const schema = gql`
    type Game {
        id: Int!
        homeTeamId: Int!
        awayTeamId: Int!
        homeTeamScore: Int
        awayTeamScore: Int
        isCompleted: Boolean!
        predictions: [Prediction]!
        homeTeam: Team!
        awayTeam: Team!
    }

    type Query {
        games: [Game!]! @skipAuth
        upcomingGames: [Game!]! @skipAuth
        game(id: Int!): Game @requireAuth
    }

    input CreateGameInput {
        homeTeamId: Int!
        awayTeamId: Int!
        homeTeamScore: Int
        awayTeamScore: Int
        isCompleted: Boolean
    }

    input UpdateGameInput {
        homeTeamId: Int
        awayTeamId: Int
        homeTeamScore: Int
        awayTeamScore: Int
        isCompleted: Boolean
    }

    type Mutation {
        createGame(input: CreateGameInput!): Game! @requireAuth
        updateGame(id: Int!, input: UpdateGameInput!): Game! @requireAuth
        deleteGame(id: Int!): Game! @requireAuth
    }
`;
