import { MetaTags } from '@redwoodjs/web';
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
            <MetaTags title="Predictions" description="Predictions page" />
            <h1>Predictions</h1>
            {data.myPredictions.map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
        </>
    );
};

export default PredictionsPage;
