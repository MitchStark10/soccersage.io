import type { EditSeasonById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import SeasonForm from 'src/components/Season/SeasonForm'

export const QUERY = gql`
  query EditSeasonById($id: Int!) {
    season: season(id: $id) {
      id
      name
      startDate
      endDate
    }
  }
`
const UPDATE_SEASON_MUTATION = gql`
  mutation UpdateSeasonMutation($id: Int!, $input: UpdateSeasonInput!) {
    updateSeason(id: $id, input: $input) {
      id
      name
      startDate
      endDate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ season }: CellSuccessProps<EditSeasonById>) => {
  const [updateSeason, { loading, error }] = useMutation(UPDATE_SEASON_MUTATION, {
    onCompleted: () => {
      toast.success('Season updated')
      navigate(routes.seasons())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateSeason({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Season {season.id}</h2>
      </header>
      <div className="rw-segment-main">
        <SeasonForm season={season} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
