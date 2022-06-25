import { createGame } from '../games/games';
import { createTeam } from '../teams/teams';
import { createUser } from '../users/users';
import {
    predictions,
    prediction,
    createPrediction,
    updatePrediction,
    deletePrediction,
} from './predictions';
import type { StandardScenario } from './predictions.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('predictions', () => {
    scenario('returns all predictions', async (scenario: StandardScenario) => {
        const result = await predictions();

        expect(result.length).toEqual(Object.keys(scenario.prediction).length);
    });

    scenario(
        'returns a single prediction',
        async (scenario: StandardScenario) => {
            const result = await prediction({ id: scenario.prediction.one.id });

            expect(result).toEqual(scenario.prediction.one);
        }
    );

    scenario('creates a prediction', async () => {
        const homeTeam = await createTeam({
            input: {
                name: 'Home Team',
            },
        });

        const awayTeam = await createTeam({
            input: {
                name: 'Away Team',
            },
        });
        const game = await createGame({
            input: {
                homeTeamId: homeTeam.id,
                awayTeamId: awayTeam.id,
                homeTeamScore: 1,
                awayTeamScore: 2,
            },
        });

        const user = await createUser({
            input: {
                email: 'someemail1',
                hashedPassword: 'somehashedpass',
                salt: 'somesalt',
                role: 'somerole',
            },
        });

        const result = await createPrediction({
            input: { userId: user.id, prediction: 'String', gameId: game.id },
        });

        expect(result.userId).toEqual(user.id);
        expect(result.gameId).toEqual(game.id);
        expect(result.prediction).toEqual('String');
    });

    scenario('updates a prediction', async (scenario: StandardScenario) => {
        const original = await prediction({ id: scenario.prediction.one.id });
        const result = await updatePrediction({
            id: original.id,
            input: { prediction: 'tie' },
        });

        expect(result.prediction).toEqual('tie');
    });

    scenario('deletes a prediction', async (scenario: StandardScenario) => {
        const original = await deletePrediction({
            id: scenario.prediction.one.id,
        });
        const result = await prediction({ id: original.id });

        expect(result).toEqual(null);
    });
});
