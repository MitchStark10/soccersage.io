import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.PredictionCreateArgs>({
    prediction: {
        one: {
            data: {
                prediction: 'String',
                User: {
                    create: {
                        email: 'String9914321',
                        username: 'String8823843',
                        hashedPassword: 'String12141',
                        status: 'String',
                    },
                },
                Team: { create: { name: 'String2302740' } },
            },
        },
        two: {
            data: {
                prediction: 'String',
                User: {
                    create: {
                        email: 'String1006167',
                        username: 'String1114189',
                        hashedPassword: 'String121412',
                        status: 'String',
                    },
                },
                Team: { create: { name: 'String8347163' } },
            },
        },
    },
});

export type StandardScenario = typeof standard;
