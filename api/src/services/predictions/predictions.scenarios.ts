import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.PredictionCreateArgs>({
    prediction: {
        one: {
            data: {
                prediction: 'String',
                userId: 'SomeID',
                Team: { create: { name: 'String2302740' } },
            },
        },
        two: {
            data: {
                prediction: 'String',
                userId: 'SomeID',
                Team: { create: { name: 'String8347163' } },
            },
        },
    },
});

export type StandardScenario = typeof standard;
