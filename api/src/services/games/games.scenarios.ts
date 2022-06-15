import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.GameCreateArgs>({
    game: {
        one: {
            data: {
                homeTeamScore: 5278373,
                awayTeamScore: 9262607,
                homeTeam: { create: { name: 'String3223999' } },
                awayTeam: { create: { name: 'String5108965' } },
            },
        },
        two: {
            data: {
                homeTeamScore: 2210328,
                awayTeamScore: 4786303,
                homeTeam: { create: { name: 'String2218724' } },
                awayTeam: { create: { name: 'String3400904' } },
            },
        },
    },
});

export type StandardScenario = typeof standard;
