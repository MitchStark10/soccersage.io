import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.GameCreateArgs>({
    game: {
        one: {
            data: {
                homeTeam: { create: { name: 'String8184842' } },
                awayTeam: { create: { name: 'String342092' } },
            },
        },
        two: {
            data: {
                homeTeam: { create: { name: 'String2664163' } },
                awayTeam: { create: { name: 'String9522390' } },
            },
        },
    },
});

export type StandardScenario = typeof standard;
