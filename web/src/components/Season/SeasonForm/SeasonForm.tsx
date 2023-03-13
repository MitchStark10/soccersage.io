import {
    Form,
    FormError,
    FieldError,
    Label,
    TextField,
    DatetimeLocalField,
    Submit,
} from '@redwoodjs/forms';

import { formatDatetimeForAdmin } from 'src/utils/format-datetime-for-admin';

const SeasonForm = (props) => {
    const onSubmit = (data) => {
        props.onSave(data, props?.season?.id);
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
                    defaultValue={props.season?.name}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />

                <FieldError name="name" className="rw-field-error" />

                <Label
                    name="startDate"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Start date
                </Label>

                <DatetimeLocalField
                    name="startDate"
                    defaultValue={formatDatetimeForAdmin(props.season?.startDate)}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />

                <FieldError name="startDate" className="rw-field-error" />

                <Label
                    name="endDate"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    End date
                </Label>

                <DatetimeLocalField
                    name="endDate"
                    defaultValue={formatDatetimeForAdmin(props.season?.endDate)}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />

                <FieldError name="endDate" className="rw-field-error" />

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

export default SeasonForm;
