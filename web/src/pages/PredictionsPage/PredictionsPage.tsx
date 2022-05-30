import { MetaTags, useQuery } from '@redwoodjs/web';
import { FIND_PREDICTIONS_QUERY } from 'src/components/Prediction/PredictionsCell';

const PredictionsPage = () => {
    const { data, loading } = useQuery(FIND_PREDICTIONS_QUERY);

    if (loading) {
        // TODO: Define loading component
        return <div>Loading...</div>;
    }

    return (
        <>
            <MetaTags title="Predictions" description="Predictions page" />
            <h1>PredictionsPage</h1>
            {JSON.stringify(data)}
        </>
    );
};

export default PredictionsPage;
