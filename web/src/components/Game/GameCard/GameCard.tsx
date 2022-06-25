import { Game, Prediction } from 'types/graphql';
import { CardContainer } from 'src/components/Core/Card/CardContainer';
import { Button } from 'src/components/Core/Form/Button';
import { H6 } from 'src/components/Core/Text/H6';

interface Props {
    game: Game;
    prediction?: Prediction | null;
}

export const GameCard: React.VFC<Props> = ({ game, prediction }) => {
    console.log('prediction', { prediction, game });
    return (
        <CardContainer className="w-full">
            <H6>
                {game.homeTeam.name} vs {game.awayTeam.name}
            </H6>
            <div className="grid flex-col justify-between items-center mt-4">
                <Button
                    variant={
                        prediction?.teamId === game.homeTeamId
                            ? 'primary'
                            : 'secondary'
                    }
                >
                    {game.homeTeam.name}
                </Button>
                <Button
                    variant={
                        prediction?.prediction === 'Tie'
                            ? 'primary'
                            : 'secondary'
                    }
                >
                    Tie
                </Button>
                <Button
                    variant={
                        prediction?.teamId === game.awayTeamId
                            ? 'primary'
                            : 'secondary'
                    }
                >
                    {game.awayTeam.name}
                </Button>
            </div>
        </CardContainer>
    );
};
