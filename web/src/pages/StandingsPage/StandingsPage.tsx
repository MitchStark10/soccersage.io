import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { MetaTags } from '@redwoodjs/web';

import { Select } from 'src/components/Core/Form/Select';
import { OptionData } from 'src/components/Core/Form/Select/Option';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { Text } from 'src/components/Core/Text/Text';

import { StandingsTable } from './StandingsTable';

const SEASON_OPTIONS: OptionData[] = [
    {
        value: '1',
        label: 'Alpha Season',
    },
];

const STANDINGS_QUERY = gql`
    query Standings($seasonId: Int!) {
        standings(seasonId: $seasonId) {
            userIdRankings {
                userId
                username
                email
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

    const currentSeasonTitle = SEASON_OPTIONS.find(
        (option) => option.value === season
    )?.label;

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
                <Select
                    title={currentSeasonTitle}
                    value={season}
                    setValue={setSeason}
                    options={SEASON_OPTIONS}
                />
                <StandingsTable standingsData={data.standings.userIdRankings} />
            </div>
        </>
    );
};

export default StandingsPage;
