import { useQuery } from '@apollo/client';
import { H1 } from 'src/components/Core/Text/H1';

const STANDINGS_QUERY = gql`
    query Standings($seasonId: Int!) {
        standings(seasonId: $seasonId) {
            userIdRankings {
                userId
                score
            }
        }
    }
`;

const StandingsPage = () => {
    const { data } = useQuery(STANDINGS_QUERY, { variables: { seasonId: 1 } });
    return (
        <>
            <H1>Standings</H1>
            {JSON.stringify(data)}
        </>
    );
};

export default StandingsPage;
