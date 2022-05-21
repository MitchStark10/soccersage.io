export const schema = gql`
  type Prediction {
    id: Int!
    userId: Int!
    teamId: Int!
    prediction: String!
    User: User!
    Team: Team!
  }

  type Query {
    predictions: [Prediction!]! @requireAuth
    prediction(id: Int!): Prediction @requireAuth
  }

  input CreatePredictionInput {
    userId: Int!
    teamId: Int!
    prediction: String!
  }

  input UpdatePredictionInput {
    userId: Int
    teamId: Int
    prediction: String
  }

  type Mutation {
    createPrediction(input: CreatePredictionInput!): Prediction! @requireAuth
    updatePrediction(id: Int!, input: UpdatePredictionInput!): Prediction!
      @requireAuth
    deletePrediction(id: Int!): Prediction! @requireAuth
  }
`
