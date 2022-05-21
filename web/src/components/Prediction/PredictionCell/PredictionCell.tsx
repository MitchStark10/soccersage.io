import type { FindPredictionById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Prediction from 'src/components/Prediction/Prediction'

export const QUERY = gql`
  query FindPredictionById($id: Int!) {
    prediction: prediction(id: $id) {
      id
      userId
      teamId
      prediction
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Prediction not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ prediction }: CellSuccessProps<FindPredictionById>) => {
  return <Prediction prediction={prediction} />
}
