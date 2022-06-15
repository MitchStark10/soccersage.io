import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.PredictionCreateArgs>({
    prediction: {
        one: { data: { userId: 'String', prediction: 'String' } },
        two: { data: { userId: 'String', prediction: 'String' } },
    },
});

export type StandardScenario = typeof standard;
