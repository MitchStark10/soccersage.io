import { MetaTags, useQuery } from '@redwoodjs/web';
import { Loading } from 'src/components/Core/Loading/Loading';
import { ErrorText } from 'src/components/Core/Text/ErrorText';
import { Text } from 'src/components/Core/Text/Text';
import { H1 } from 'src/components/Core/Text/H1';
import { Game, Prediction } from 'types/graphql';
import { GameCard } from 'src/components/Game/GameCard/GameCard';
import { MY_PREDICTIONS_QUERY } from '../PredictionsPage/PredictionsPage';

const UPCOMING_GAMES_QUERY = gql`
    query FindGames {
        games {
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
    const {
        data: gameData,
        loading: gameLoading,
        error: gameError,
    } = useQuery<{ games: Game[] }>(UPCOMING_GAMES_QUERY);

    const {
        data: predictionsData,
        loading: predictionsLoading,
        error: predictionsError,
    } = useQuery<{ myPredictions: Prediction[] }>(MY_PREDICTIONS_QUERY);

    const error = gameError || predictionsError;
    const loading = gameLoading || predictionsLoading;

    if (error) {
        return <ErrorText>Error: {error}</ErrorText>;
    } else if (loading) {
        return <Loading />;
    }

    const games = gameData.games;
    const predictionsMapByGameId = predictionsData.myPredictions.reduce(
        (acc, prediction) => {
            acc[prediction.gameId] = prediction;
            return acc;
        },
        {}
    );

    return (
        <>
            <MetaTags title="Games" description="Games page" />
            <H1>Upcoming Games</H1>
            {games.length === 0 ? (
                <Text>There are no upcoming games.</Text>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {games.map((game, index) => {
                        return (
                            <GameCard
                                key={index}
                                game={game}
                                prediction={predictionsMapByGameId[game.id]}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default GamesPage;
