import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Prediction/PredictionsCell'

const DELETE_PREDICTION_MUTATION = gql`
  mutation DeletePredictionMutation($id: Int!) {
    deletePrediction(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const PredictionsList = ({ predictions }) => {
  const [deletePrediction] = useMutation(DELETE_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('Prediction deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete prediction ' + id + '?')) {
      deletePrediction({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Game id</th>
            <th>Team id</th>
            <th>Prediction</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction) => (
            <tr key={prediction.id}>
              <td>{truncate(prediction.id)}</td>
              <td>{truncate(prediction.userId)}</td>
              <td>{truncate(prediction.gameId)}</td>
              <td>{truncate(prediction.teamId)}</td>
              <td>{truncate(prediction.prediction)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.prediction({ id: prediction.id })}
                    title={'Show prediction ' + prediction.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPrediction({ id: prediction.id })}
                    title={'Edit prediction ' + prediction.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete prediction ' + prediction.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(prediction.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PredictionsList
