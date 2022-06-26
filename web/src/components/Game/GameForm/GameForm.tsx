import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'



const GameForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.game?.id)
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
          name="homeTeamId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Home team id
        </Label>
        
          <NumberField
            name="homeTeamId"
            defaultValue={props.game?.homeTeamId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="homeTeamId" className="rw-field-error" />

        <Label
          name="awayTeamId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Away team id
        </Label>
        
          <NumberField
            name="awayTeamId"
            defaultValue={props.game?.awayTeamId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="awayTeamId" className="rw-field-error" />

        <Label
          name="homeTeamScore"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Home team score
        </Label>
        
          <NumberField
            name="homeTeamScore"
            defaultValue={props.game?.homeTeamScore}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="homeTeamScore" className="rw-field-error" />

        <Label
          name="awayTeamScore"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Away team score
        </Label>
        
          <NumberField
            name="awayTeamScore"
            defaultValue={props.game?.awayTeamScore}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="awayTeamScore" className="rw-field-error" />

        <Label
          name="isCompleted"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is completed
        </Label>
        
          <CheckboxField
            name="isCompleted"
            defaultChecked={props.game?.isCompleted}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="isCompleted" className="rw-field-error" />

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

export default GameForm
