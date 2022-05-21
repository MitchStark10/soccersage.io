import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TeamCreateArgs>({
  team: {
    one: { data: { name: 'String5171083' } },
    two: { data: { name: 'String4953387' } },
  },
})

export type StandardScenario = typeof standard
