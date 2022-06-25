import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.PredictionCreateArgs>({
    prediction: {
        one: {
            data: {
                user: {
                    create: {
                        email: 'test1',
                        hashedPassword: 'test',
                        salt: 'test',
                        role: 'test',
                    },
                },
                prediction: 'String',
                game: {
                    create: {
                        homeTeamScore: 5278373,
                        awayTeamScore: 9262607,
                        homeTeam: { create: { name: 'String3223999' } },
                        awayTeam: { create: { name: 'String5108965' } },
                    },
                },
            },
        },
        two: {
            data: {
                user: {
                    create: {
                        email: 'test2',
                        hashedPassword: 'test',
                        salt: 'test',
                        role: 'test',
                    },
                },
                prediction: 'String',
                game: {
                    create: {
                        homeTeamScore: 2210328,
                        awayTeamScore: 4786303,
                        homeTeam: { create: { name: 'String2218724' } },
                        awayTeam: { create: { name: 'String3400904' } },
                    },
                },
            },
        },
    },
});

export type StandardScenario = typeof standard;
