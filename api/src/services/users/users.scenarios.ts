import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: {
            data: {
                email: 'String8843735',
                hashedPassword: 'String',
                salt: 'String',
                role: 'String',
            },
        },
        two: {
            data: {
                email: 'String9261536',
                hashedPassword: 'String',
                salt: 'String',
                role: 'String',
            },
        },
    },
});

export type StandardScenario = typeof standard;
