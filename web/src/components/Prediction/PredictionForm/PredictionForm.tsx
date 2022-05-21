import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'



const PredictionForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.prediction?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.prediction?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="teamId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Team id
        </Label>
        
          <NumberField
            name="teamId"
            defaultValue={props.prediction?.teamId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="teamId" className="rw-field-error" />

        <Label
          name="prediction"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Prediction
        </Label>
        
          <TextField
            name="prediction"
            defaultValue={props.prediction?.prediction}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="prediction" className="rw-field-error" />

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

export default PredictionForm
