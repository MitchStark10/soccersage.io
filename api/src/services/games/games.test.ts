import { games, game, createGame, updateGame, deleteGame } from './games'
import type { StandardScenario } from './games.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('games', () => {
  scenario('returns all games', async (scenario: StandardScenario) => {
    const result = await games()

    expect(result.length).toEqual(Object.keys(scenario.game).length)
  })

  scenario('returns a single game', async (scenario: StandardScenario) => {
    const result = await game({ id: scenario.game.one.id })

    expect(result).toEqual(scenario.game.one)
  })

  scenario('creates a game', async (scenario: StandardScenario) => {
    const result = await createGame({
      input: {
        homeTeamId: scenario.game.two.homeTeamId,
        awayTeamId: scenario.game.two.awayTeamId,
        homeTeamScore: 7090437,
        awayTeamScore: 3203833,
      },
    })

    expect(result.homeTeamId).toEqual(scenario.game.two.homeTeamId)
    expect(result.awayTeamId).toEqual(scenario.game.two.awayTeamId)
    expect(result.homeTeamScore).toEqual(7090437)
    expect(result.awayTeamScore).toEqual(3203833)
  })

  scenario('updates a game', async (scenario: StandardScenario) => {
    const original = await game({ id: scenario.game.one.id })
    const result = await updateGame({
      id: original.id,
      input: { homeTeamScore: 1044116 },
    })

    expect(result.homeTeamScore).toEqual(1044116)
  })

  scenario('deletes a game', async (scenario: StandardScenario) => {
    const original = await deleteGame({ id: scenario.game.one.id })
    const result = await game({ id: original.id })

    expect(result).toEqual(null)
  })
})
