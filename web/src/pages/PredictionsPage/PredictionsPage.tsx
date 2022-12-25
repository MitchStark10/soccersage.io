import { Prediction } from 'types/graphql';

import { MetaTags } from '@redwoodjs/web';

import { CardGrid } from 'src/components/Core/Card/CardGrid';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { H1 } from 'src/components/Core/Text/H1';
import { Text } from 'src/components/Core/Text/Text';
import { PredictionCard } from 'src/components/Prediction/PredictionCard';
import { useAuthenticatedQuery } from 'src/hooks/use-authenticated-query';

export const MY_PREDICTIONS_QUERY = gql`
    query FindMyPredictions {
        myPredictions {
            id
            userId
            gameId
            teamId
            prediction
            game {
                seasonId
                isCompleted
                homeTeamId
                homeTeamScore
                homeTeam {
                    name
                    logoUrl
                }
                awayTeamId
                awayTeamScore
                awayTeam {
                    name
                    logoUrl
                }
            }
            team {
                name
                logoUrl
            }
        }
    }
`;

const PredictionsPage = () => {
    const { data, loading, error } =
        useAuthenticatedQuery(MY_PREDICTIONS_QUERY);

    if (error) {
        return <ErrorText>Error: {error.message}</ErrorText>;
    } else if (loading) {
        return <Loading />;
    }

    const pendingPredictions = data.myPredictions.filter(
        (prediction: Prediction) => !prediction.game.isCompleted
    );

    const completedPredictions = data.myPredictions.filter(
        (prediction: Prediction) => prediction.game.isCompleted
    );

    return (
        <>
            <MetaTags
                title="Predictions"
                description="View all of your recent predictions"
            />
            {pendingPredictions.length === 0 &&
            completedPredictions.length === 0 ? (
                <H1 className="m-4 text-center">Predictions</H1>
            ) : null}
            {data.myPredictions.length === 0 ? (
                <Text>You haven&apos;t made any predictions yet.</Text>
            ) : null}

            {/* TODO: Display the following stat cards:
            Predictions Made/Won/Percentage
            Current place in standings standings
            Current streak */}

            {pendingPredictions.length > 0 ? (
                <>
                    <H1>Pending Results</H1>
                    <CardGrid>
                        {pendingPredictions.map((prediction) => (
                            <PredictionCard
                                key={prediction.id}
                                prediction={prediction}
                            />
                        ))}
                    </CardGrid>
                </>
            ) : null}
            {completedPredictions.length > 0 ? (
                <>
                    <H1>Completed</H1>
                    <CardGrid>
                        {completedPredictions.map((prediction) => (
                            <PredictionCard
                                key={prediction.id}
                                prediction={prediction}
                            />
                        ))}
                    </CardGrid>
                </>
            ) : null}
        </>
    );
};

export default PredictionsPage;
