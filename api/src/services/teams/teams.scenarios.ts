import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.TeamCreateArgs>({
    team: {
        one: { data: { name: 'String8515038' } },
        two: { data: { name: 'String8222857' } },
    },
});

export type StandardScenario = typeof standard;
