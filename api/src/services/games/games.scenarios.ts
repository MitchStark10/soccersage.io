import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.GameCreateArgs>({
  game: {
    one: {
      data: {
        homeTeamScore: 7826054,
        awayTeamScore: 3210727,
        homeTeam: { create: { name: 'String5094676' } },
        awayTeam: { create: { name: 'String165727' } },
      },
    },
    two: {
      data: {
        homeTeamScore: 7353503,
        awayTeamScore: 4218032,
        homeTeam: { create: { name: 'String1271698' } },
        awayTeam: { create: { name: 'String6921335' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
