import { render } from '@redwoodjs/testing/web'

import Layout from './Layout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('Layout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Layout />)
    }).not.toThrow()
  })
})
