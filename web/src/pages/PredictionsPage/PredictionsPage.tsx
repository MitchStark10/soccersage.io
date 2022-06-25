import { MetaTags } from '@redwoodjs/web';
import { H1 } from 'src/components/Core/Text/H1';
import { PredictionCard } from 'src/components/Prediction/PredictionCard';
import { useAuthenticatedQuery } from 'src/hooks/use-authenticated-query';

const MY_PREDICTIONS_QUERY = gql`
    query FindMyPredictions {
        myPredictions {
            id
            userId
            gameId
            teamId
            prediction
            game {
                homeTeam {
                    name
                }
                awayTeam {
                    name
                }
            }
            team {
                name
            }
        }
    }
`;

const PredictionsPage = () => {
    const { data, loading, error } =
        useAuthenticatedQuery(MY_PREDICTIONS_QUERY);

    if (error) {
        // TODO: Define the error text component
        return <div>Error: {error.message}</div>;
    } else if (loading) {
        // TODO: Define loading component
        return <div>Loading...</div>;
    }

    return (
        <>
            <MetaTags
                title="Predictions"
                description="View all of your recent predictions"
            />
            <H1 className="m-4 text-center">Predictions</H1>
            {data.myPredictions.map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
        </>
    );
};

export default PredictionsPage;
