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

    scenario('creates a prediction', async (scenario: StandardScenario) => {
        const result = await createPrediction({
            input: {
                userId: scenario.prediction.two.userId,
                teamId: scenario.prediction.two.teamId,
                prediction: 'String',
            },
        });

        expect(result.userId).toEqual(scenario.prediction.two.userId);
        expect(result.teamId).toEqual(scenario.prediction.two.teamId);
        expect(result.prediction).toEqual('String');
    });

    scenario('updates a prediction', async (scenario: StandardScenario) => {
        const original = await prediction({ id: scenario.prediction.one.id });
        const result = await updatePrediction({
            id: original.id,
            input: { prediction: 'String2' },
        });

        expect(result.prediction).toEqual('String2');
    });

    scenario('deletes a prediction', async (scenario: StandardScenario) => {
        const original = await deletePrediction({
            id: scenario.prediction.one.id,
        });
        const result = await prediction({ id: original.id });

        expect(result).toEqual(null);
    });
});
