import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { MetaTags } from '@redwoodjs/web';

import {
    SeasonSelect,
    SEASON_OPTIONS,
} from 'src/components/Core/Form/Select/SeasonSelect';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { Text } from 'src/components/Core/Text/Text';

import { StandingsTable } from './StandingsTable';

const STANDINGS_QUERY = gql`
    query Standings($seasonId: Int!) {
        standings(seasonId: $seasonId) {
            userRankings {
                username
                score
                correctWins
                correctTies
                numCompletedPredictions
            }
        }
    }
`;

const StandingsPage = () => {
    const [season, setSeason] = useState(SEASON_OPTIONS[0].value);
    const { data, loading, error } = useQuery(STANDINGS_QUERY, {
        variables: { seasonId: parseInt(season) },
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
            <Text As="h1" textAlign="center">
                Standings
            </Text>
            <div className="max-w-[700px] mx-auto">
                <SeasonSelect season={season} setSeason={setSeason} />
                <StandingsTable standingsData={data.standings.userRankings} />
            </div>
        </>
    );
};

export default StandingsPage;
