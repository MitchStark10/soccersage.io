import type { FindSeasonById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Season from 'src/components/Season/Season'

export const QUERY = gql`
  query FindSeasonById($id: Int!) {
    season: season(id: $id) {
      id
      name
      startDate
      endDate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Season not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ season }: CellSuccessProps<FindSeasonById>) => {
  return <Season season={season} />
}
