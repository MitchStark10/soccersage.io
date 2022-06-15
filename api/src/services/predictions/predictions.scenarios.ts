import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.PredictionCreateArgs>({
    prediction: {
        one: {
            data: { userId: 'String', gameId: 5761842, prediction: 'String' },
        },
        two: {
            data: { userId: 'String', gameId: 3542349, prediction: 'String' },
        },
    },
});

export type StandardScenario = typeof standard;
