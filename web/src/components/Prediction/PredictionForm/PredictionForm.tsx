import { Team } from 'types/graphql';

import {
    Form,
    FormError,
    FieldError,
    Label,
    TextField,
    NumberField,
    Submit,
    SelectField,
} from '@redwoodjs/forms';
import { useQuery } from '@redwoodjs/web';

import LoadingDots from 'src/components/Core/Form/LoadingDots';
import { teamComparator, TEAM_QUERY } from 'src/components/Game/GameForm';

const PredictionForm = (props) => {
    const { data: teams, loading } = useQuery(TEAM_QUERY);

    const onSubmit = (data) => {
        props.onSave(
            {
                ...data,
                userId: props.prediction?.userId,
                teamId: data.prediction === 'tie' ? null : data.teamId,
            },
            props?.prediction?.id
        );
    };

    if (loading) {
        return <LoadingDots />;
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
                    User Email
                </Label>

                <TextField
                    name="userId"
                    defaultValue={props.prediction?.user?.email}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />

                <FieldError name="userId" className="rw-field-error" />

                <Label
                    name="gameId"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Game id
                </Label>

                <NumberField
                    name="gameId"
                    defaultValue={props.prediction?.gameId}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />

                <FieldError name="gameId" className="rw-field-error" />

                <Label
                    name="teamId"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Team
                </Label>

                <SelectField
                    name="teamId"
                    defaultValue={props.game?.homeTeamId}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                >
                    {teams.teams
                        .slice()
                        .sort(teamComparator)
                        .map((team: Team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                </SelectField>

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
    );
};

export default PredictionForm;
