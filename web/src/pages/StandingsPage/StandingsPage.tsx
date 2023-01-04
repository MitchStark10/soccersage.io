import { useQuery } from '@apollo/client';

import { MetaTags } from '@redwoodjs/web';

import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { Text } from 'src/components/Core/Text/Text';

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
            <MetaTags
                title="Standings"
                description="View the current soccersage.io standings"
            />
            <Text As="h1">Standings</Text>
            <StandingsTable standingsData={data.standings.userIdRankings} />
        </>
    );
};

export default StandingsPage;
