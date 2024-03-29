import {
    createPrediction,
    deletePrediction,
    prediction,
    predictions,
    updatePrediction,
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

    scenario('creates a prediction', async (scenario: StandardScenario) => {
        const result = await createPrediction(
            {
                input: {
                    userId: scenario.prediction.one.userId,
                    prediction: 'String',
                    gameId: scenario.prediction.one.gameId,
                    seasonId: scenario.prediction.one.seasonId,
                },
            },
            // eslint-disable-next-line -- Ignoring mocked user
            // @ts-ignore
            { context: { currentUser: { id: 1 } } }
        );

        expect(result.userId).toEqual(scenario.prediction.one.userId);
        expect(result.gameId).toEqual(scenario.prediction.one.gameId);
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

    scenario(
        'cannot create a prediction for a past game',
        async (scenario: StandardScenario) => {
            const predictionCreator = async () => {
                await createPrediction(
                    {
                        input: {
                            userId: scenario.prediction.past.userId,
                            prediction: 'String',
                            gameId: scenario.prediction.past.gameId,
                            seasonId: scenario.prediction.past.seasonId,
                        },
                    },
                    // eslint-disable-next-line -- Ignoring mocked user
                    // @ts-ignore
                    { context: { currentUser: { id: 1 } } }
                );
            };
            await expect(predictionCreator).rejects.toThrow(
                'Cannot make a prediction for a game that has already started'
            );
        }
    );
});
