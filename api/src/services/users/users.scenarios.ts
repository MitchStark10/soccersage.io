import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: {
            data: {
                email: 'String9017090',
                username: 'String5624435',
                hashedPassword: 'SomeHashedPass',
                status: 'String',
            },
        },
        two: {
            data: {
                email: 'String6351771',
                username: 'String3096977',
                hashedPassword: 'SomeHashedPass',
                status: 'String',
            },
        },
    },
});

export type StandardScenario = typeof standard;
