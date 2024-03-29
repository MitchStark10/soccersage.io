import {
    Form,
    FormError,
    FieldError,
    Label,
    TextField,
    Submit,
} from '@redwoodjs/forms';

const TeamForm = (props) => {
    const onSubmit = (data) => {
        props.onSave(data, props?.team?.id);
    };

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
                    name="name"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Name
                </Label>

                <TextField
                    name="name"
                    defaultValue={props.team?.name}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />

                <FieldError name="name" className="rw-field-error" />

                <Label
                    name="logoUrl"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Logo URL
                </Label>

                <TextField
                    name="logoUrl"
                    defaultValue={props.team?.logoUrl}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                />

                <FieldError name="logoUrl" className="rw-field-error" />

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
    );
};

export default TeamForm;
