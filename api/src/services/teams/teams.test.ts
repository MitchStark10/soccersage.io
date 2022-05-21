import { teams, team, createTeam, updateTeam, deleteTeam } from './teams'
import type { StandardScenario } from './teams.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('teams', () => {
  scenario('returns all teams', async (scenario: StandardScenario) => {
    const result = await teams()

    expect(result.length).toEqual(Object.keys(scenario.team).length)
  })

  scenario('returns a single team', async (scenario: StandardScenario) => {
    const result = await team({ id: scenario.team.one.id })

    expect(result).toEqual(scenario.team.one)
  })

  scenario('creates a team', async () => {
    const result = await createTeam({
      input: { name: 'String6408752' },
    })

    expect(result.name).toEqual('String6408752')
  })

  scenario('updates a team', async (scenario: StandardScenario) => {
    const original = await team({ id: scenario.team.one.id })
    const result = await updateTeam({
      id: original.id,
      input: { name: 'String41159022' },
    })

    expect(result.name).toEqual('String41159022')
  })

  scenario('deletes a team', async (scenario: StandardScenario) => {
    const original = await deleteTeam({ id: scenario.team.one.id })
    const result = await team({ id: original.id })

    expect(result).toEqual(null)
  })
})
