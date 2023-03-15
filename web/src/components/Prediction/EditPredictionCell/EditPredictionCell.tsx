import type { EditPredictionById } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import PredictionForm from 'src/components/Prediction/PredictionForm';

export const QUERY = gql`
    query EditPredictionById($id: Int!) {
        prediction: prediction(id: $id) {
            id
            userId
            gameId
            teamId
            prediction
            user {
                email
            }
        }
    }
`;
const UPDATE_PREDICTION_MUTATION = gql`
    mutation UpdatePredictionMutationCell(
        $id: Int!
        $input: UpdatePredictionInput!
    ) {
        updatePrediction(id: $id, input: $input) {
            id
            userId
            gameId
            teamId
            prediction
        }
    }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
    <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
    prediction,
}: CellSuccessProps<EditPredictionById>) => {
    const [updatePrediction, { loading, error }] = useMutation(
        UPDATE_PREDICTION_MUTATION,
        {
            onCompleted: () => {
                toast.success('Prediction updated');
                navigate(routes.predictions());
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    );

    const onSave = (input, id) => {
        const castInput = Object.assign(input, {
            gameId: parseInt(input.gameId),
            teamId: parseInt(input.teamId),
        });
        updatePrediction({ variables: { id, input: castInput } });
    };

    return (
        <div className="rw-segment">
            <header className="rw-segment-header">
                <h2 className="rw-heading rw-heading-secondary">
                    Edit Prediction {prediction.id}
                </h2>
            </header>
            <div className="rw-segment-main">
                <PredictionForm
                    prediction={prediction}
                    onSave={onSave}
                    error={error}
                    loading={loading}
                />
            </div>
        </div>
    );
};
