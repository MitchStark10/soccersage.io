export const schema = gql`
    type Game {
        id: Int!
        homeTeamId: Int!
        awayTeamId: Int!
        homeTeamScore: Int
        awayTeamScore: Int
        homeTeam: Team!
        awayTeam: Team!
    }

    type Query {
        games: [Game!]! @skipAuth
        game(id: Int!): Game @skipAuth
    }

    input CreateGameInput {
        homeTeamId: Int!
        awayTeamId: Int!
        homeTeamScore: Int
        awayTeamScore: Int
    }

    input UpdateGameInput {
        homeTeamId: Int
        awayTeamId: Int
        homeTeamScore: Int
        awayTeamScore: Int
    }

    type Mutation {
        createGame(input: CreateGameInput!): Game! @requireAuth
        updateGame(id: Int!, input: UpdateGameInput!): Game! @requireAuth
        deleteGame(id: Int!): Game! @requireAuth
    }
`;
