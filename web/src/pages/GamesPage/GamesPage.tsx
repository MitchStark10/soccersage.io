import { MetaTags, useQuery } from '@redwoodjs/web';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { Text } from 'src/components/Core/Text/Text';
import { H1 } from 'src/components/Core/Text/H1';
import { Game, Prediction } from 'types/graphql';
import { GameCard } from 'src/components/Game/GameCard/GameCard';
import { MY_PREDICTIONS_QUERY } from '../PredictionsPage/PredictionsPage';
import { CardGrid } from 'src/components/Core/Card/CardGrid';
import { useAuth } from '@redwoodjs/auth';

const UPCOMING_GAMES_QUERY = gql`
    query FindUpcomingGames {
        upcomingGames {
            id
            homeTeamId
            homeTeam {
                name
            }
            homeTeamScore
            awayTeamId
            awayTeam {
                name
            }
            awayTeamScore
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

    const {
        data: predictionsData,
        error: predictionsError,
        refetch: predictionsRefetch,
    } = useQuery<{ myPredictions: Prediction[] }>(MY_PREDICTIONS_QUERY);

    const error = gameError || predictionsError;
    const loading = gameLoading || (!predictionsData && isAuthenticated);

    if (error) {
        return <ErrorText>Error: {error.message}</ErrorText>;
    } else if (loading) {
        return <Loading />;
    }

    const games = gameData.upcomingGames;
    const predictionsMapByGameId =
        predictionsData?.myPredictions.reduce((acc, prediction) => {
            acc[prediction.gameId] = prediction;
            return acc;
        }, {}) || {};

    return (
        <>
            <MetaTags title="Games" description="Games page" />
            <H1>Upcoming Games</H1>
            {games.length === 0 ? (
                <Text>There are no upcoming games.</Text>
            ) : (
                <CardGrid>
                    {games.map((game, index) => {
                        return (
                            <GameCard
                                key={index}
                                game={game}
                                prediction={predictionsMapByGameId[game.id]}
                                refetchPredictions={predictionsRefetch}
                            />
                        );
                    })}
                </CardGrid>
            )}
        </>
    );
};

export default GamesPage;
