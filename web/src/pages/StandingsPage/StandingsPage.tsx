import { useQuery } from '@apollo/client';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { H1 } from 'src/components/Core/Text/H1';
import { StandingsTable } from './StandingsTable';

const STANDINGS_QUERY = gql`
    query Standings($seasonId: Int!) {
        standings(seasonId: $seasonId) {
            userIdRankings {
                userId
                username
                email
                score
            }
        }
    }
`;

const StandingsPage = () => {
    const { data, loading, error } = useQuery(STANDINGS_QUERY, {
        variables: { seasonId: 1 },
    });

    if (loading) {
        return <Loading />;
    } else if (error) {
        return <ErrorText>{error.message}</ErrorText>;
    }

    return (
        <>
            <H1>Standings</H1>
            <StandingsTable standingsData={data.standings.userIdRankings} />
        </>
    );
};

export default StandingsPage;
