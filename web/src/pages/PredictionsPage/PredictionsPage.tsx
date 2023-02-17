import { Prediction } from 'types/graphql';

import { MetaTags } from '@redwoodjs/web';

import { CardGrid } from 'src/components/Core/Card/CardGrid';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { Text } from 'src/components/Core/Text/Text';
import { PredictionCard } from 'src/components/Prediction/Cards';
import { StatCard } from 'src/components/Prediction/Cards/StatCard';
import { useAuthenticatedQuery } from 'src/hooks/use-authenticated-query';
import {
    getPredictionStatus,
    PREDICTION_STATUS,
} from 'src/utils/get-prediction-status';

export const MY_PREDICTIONS_QUERY = gql`
    query FindMyPredictions {
        myPredictions {
            streakCount
            predictions {
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
                    startDateTime
                }
                team {
                    name
                    logoUrl
                }
            }
        }
    }
`;

const PredictionsPage = () => {
    const { data, loading, error } = useAuthenticatedQuery<{
        myPredictions: {
            streakCount: number;
            predictions: Prediction[];
        };
    }>(MY_PREDICTIONS_QUERY);

    if (error) {
        return <ErrorText>Error: {error.message}</ErrorText>;
    } else if (loading) {
        return <Loading />;
    }

    const predictionResults = data.myPredictions.predictions;

    const completedPredictions: Prediction[] = predictionResults.filter(
        (prediction: Prediction) => prediction.game.isCompleted
    );

    const completedPredictionsCount = completedPredictions.length;

    const correctPredictions: number = completedPredictions.filter(
        (prediction) =>
            getPredictionStatus(prediction) === PREDICTION_STATUS.correctTie ||
            getPredictionStatus(prediction) === PREDICTION_STATUS.correctWin
    ).length;

    return (
        <>
            <MetaTags
                title="Predictions"
                description="View all of your recent predictions"
            />
            {predictionResults.length === 0 ? (
                <Text As="h1" textAlign="center" className="m-4">
                    Predictions
                </Text>
            ) : null}
            {predictionResults.length === 0 ? (
                <Text>You haven&apos;t made any predictions yet.</Text>
            ) : null}

            <div className="from-primary to-primary-dark bg-gradient-to-r py-6 -mx-5 px-5 text-white mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:justify-center sm:items-center sm:justify-items-center lg:w-1/2 mx-auto">
                    <StatCard title="Predictions Made">
                        {predictionResults.length}
                    </StatCard>
                    <StatCard title="Success Rate">
                        {completedPredictionsCount > 0
                            ? `${
                                  (correctPredictions /
                                      completedPredictionsCount) *
                                  100
                              }%`
                            : 'N/A'}
                    </StatCard>
                    <StatCard title="Current Streak">
                        {data.myPredictions.streakCount}
                    </StatCard>
                </div>
            </div>

            {predictionResults.length > 0 ? (
                <CardGrid>
                    {predictionResults.map((prediction) => (
                        <PredictionCard
                            key={prediction.id}
                            prediction={prediction}
                        />
                    ))}
                </CardGrid>
            ) : null}
        </>
    );
};

export default PredictionsPage;
