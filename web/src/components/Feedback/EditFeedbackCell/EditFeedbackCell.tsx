import type { EditFeedbackById, UpdateFeedbackInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FeedbackForm from 'src/components/Feedback/FeedbackForm'

export const QUERY = gql`
  query EditFeedbackById($id: Int!) {
    feedback: feedback(id: $id) {
      id
      feedback
    }
  }
`
const UPDATE_FEEDBACK_MUTATION = gql`
  mutation UpdateFeedbackMutation($id: Int!, $input: UpdateFeedbackInput!) {
    updateFeedback(id: $id, input: $input) {
      id
      feedback
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ feedback }: CellSuccessProps<EditFeedbackById>) => {
  const [updateFeedback, { loading, error }] = useMutation(
    UPDATE_FEEDBACK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Feedback updated')
        navigate(routes.feedbacks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateFeedbackInput,
    id: EditFeedbackById['feedback']['id']
  ) => {
    updateFeedback({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Feedback {feedback?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <FeedbackForm feedback={feedback} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
