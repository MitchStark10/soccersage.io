import { useQuery } from '@apollo/client';
import { Game, Prediction } from 'types/graphql';

import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';

import { CardGrid } from 'src/components/Core/Card/CardGrid';
import { SEASON_OPTIONS } from 'src/components/Core/Form/Select/SeasonSelect';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { Text } from 'src/components/Core/Text/Text';
import { GameCard } from 'src/components/Game/GameCard/GameCard';

import { MY_PREDICTIONS_QUERY } from '../PredictionsPage/PredictionsPage';

const UPCOMING_GAMES_QUERY = gql`
    query FindUpcomingGames {
        upcomingGames {
            id
            startDateTime
            homeTeamId
            homeTeam {
                name
                logoUrl
            }
            homeTeamScore
            awayTeamId
            awayTeam {
                name
                logoUrl
            }
            awayTeamScore
            seasonId
        }
    }
`;

const GamesPage = () => {
    const { isAuthenticated } = useAuth();

    const {
        data: gameData,
        loading: gameLoading,
        error: gameError,
    } = useQuery<{ upcomingGames: Game[] }>(UPCOMING_GAMES_QUERY);

    const { data: predictionsData, error: predictionsError } = useQuery<{
        myPredictions: {
            streakCount: number;
            predictions: Prediction[];
        };
    }>(MY_PREDICTIONS_QUERY, {
        variables: {
            seasonId: parseInt(SEASON_OPTIONS[0].value, 10),
        },
    });

    const error = gameError || (isAuthenticated && predictionsError);

    if (error) {
        return <ErrorText>Error: {error.message}</ErrorText>;
    } else if (gameLoading && !gameData) {
        return <Loading />;
    }

    const games = gameData.upcomingGames;
    const predictionsMapByGameId =
        predictionsData?.myPredictions.predictions.reduce((acc, prediction) => {
            acc[prediction.gameId] = prediction;
            return acc;
        }, {}) || {};

    return (
        <>
            <MetaTags title="Games" description="Games page" />
            <Text As="h1" textAlign="center">
                Upcoming Games
            </Text>
            {games.length === 0 ? (
                <Text textAlign="center">
                    There are no upcoming games eligible for prediction. Please
                    check again later!
                </Text>
            ) : (
                <CardGrid>
                    {games.map((game, index) => {
                        return (
                            <GameCard
                                key={index}
                                game={game}
                                prediction={predictionsMapByGameId[game.id]}
                            />
                        );
                    })}
                </CardGrid>
            )}
        </>
    );
};

export default GamesPage;
