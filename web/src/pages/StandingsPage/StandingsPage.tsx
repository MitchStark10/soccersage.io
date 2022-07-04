import { useQuery } from '@apollo/client';
import { Loading } from 'src/components/Core/Loading/Loading';
import { H1 } from 'src/components/Core/Text/H1';
import { StandingsTable } from './StandingsTable';

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
    const { data, loading } = useQuery(STANDINGS_QUERY, {
        variables: { seasonId: 1 },
    });

    if (loading) {
        return <Loading />;
    }

    console.log('data', data);

    return (
        <>
            <H1>Standings</H1>
            <StandingsTable standingsData={data.standings.userIdRankings} />
        </>
    );
};

export default StandingsPage;
