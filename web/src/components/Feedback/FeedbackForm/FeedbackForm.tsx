import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditFeedbackById, UpdateFeedbackInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormFeedback = NonNullable<EditFeedbackById['feedback']>

interface FeedbackFormProps {
  feedback?: EditFeedbackById['feedback']
  onSave: (data: UpdateFeedbackInput, id?: FormFeedback['id']) => void
  error: RWGqlError
  loading: boolean
}

const FeedbackForm = (props: FeedbackFormProps) => {
  const onSubmit = (data: FormFeedback) => {
  
    
    
  
    props.onSave(data, props?.feedback?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormFeedback> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="feedback"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Feedback
        </Label>
        
          <TextField
            name="feedback"
            defaultValue={props.feedback?.feedback}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="feedback" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FeedbackForm
