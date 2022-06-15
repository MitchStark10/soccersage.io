import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import PredictionForm from 'src/components/Prediction/PredictionForm'

const CREATE_PREDICTION_MUTATION = gql`
  mutation CreatePredictionMutation($input: CreatePredictionInput!) {
    createPrediction(input: $input) {
      id
    }
  }
`

const NewPrediction = () => {
  const [createPrediction, { loading, error }] = useMutation(CREATE_PREDICTION_MUTATION, {
    onCompleted: () => {
      toast.success('Prediction created')
      navigate(routes.predictions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { gameId: parseInt(input.gameId), teamId: parseInt(input.teamId), })
    createPrediction({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Prediction</h2>
      </header>
      <div className="rw-segment-main">
        <PredictionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPrediction
