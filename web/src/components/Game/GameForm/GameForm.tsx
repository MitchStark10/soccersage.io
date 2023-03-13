import { useQuery } from '@apollo/client';
import { Game, Season, Team, UpdateGameInput } from 'types/graphql';
import { RecursivePartial } from 'types/recursive-partial';

import {
    Form,
    FormError,
    FieldError,
    Label,
    NumberField,
    CheckboxField,
    Submit,
    SelectField,
    DatetimeLocalField,
    RWGqlError,
} from '@redwoodjs/forms';

import { Loading } from 'src/components/Core/Loading/Loading';
import { formatDatetimeForAdmin } from 'src/utils/format-datetime-for-admin';

const TEAM_QUERY = gql`
    query TEAM_QUERY {
        teams {
            id
            name
        }
    }
`;

const SEASONS_QUERY = gql`
    query SEASONS_QUERY {
        seasons {
            id
            name
        }
    }
`;

const teamComparator = (a: Team, b: Team) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

interface Props {
    game?: RecursivePartial<Game>;
    onSave: (game: UpdateGameInput, id?: number) => void;
    error?: RWGqlError;
    loading?: boolean;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const GameForm = (props: Props) => {
    const onSubmit = (data: any) => {
        /* eslint-enable @typescript-eslint/no-explicit-any */
        const { homeTeamId, awayTeamId, seasonId, ...rest } = data;
        props.onSave(
            {
                homeTeamId: parseInt(homeTeamId),
                awayTeamId: parseInt(awayTeamId),
                seasonId: parseInt(seasonId),
                ...rest,
            },
            props?.game?.id
        );
    };

    const { data: teams, loading } = useQuery(TEAM_QUERY);
    const { data: seasons, loading: loadingSeasons } = useQuery(SEASONS_QUERY);

    if (loading || loadingSeasons) {
        return <Loading />;
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

                <SelectField
                    name="homeTeamId"
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

                <FieldError name="homeTeamId" className="rw-field-error" />

                <Label
                    name="awayTeamId"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Away team id
                </Label>

                <SelectField
                    name="awayTeamId"
                    defaultValue={props.game?.awayTeamId}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                >
                    {teams.teams.map((team: Team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </SelectField>

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
                    name="startDateTime"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Start date time
                </Label>

                <DatetimeLocalField
                    name="startDateTime"
                    defaultValue={formatDatetimeForAdmin(
                        props.game?.startDateTime
                    )}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                />

                <FieldError name="startDateTime" className="rw-field-error" />

                <Label
                    name="seasonId"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                >
                    Season ID
                </Label>

                <SelectField
                    name="seasonId"
                    defaultValue={props.game?.seasonId}
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{ required: true }}
                >
                    {seasons.seasons.map((season: Season) => (
                        <option key={season.id} value={season.id}>
                            {season.name}
                        </option>
                    ))}
                </SelectField>

                <FieldError name="seasonId" className="rw-field-error" />

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
    );
};

export default GameForm;
