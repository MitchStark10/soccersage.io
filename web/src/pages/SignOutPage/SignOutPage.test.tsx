import { render } from '@redwoodjs/testing/web'

import SignOutPage from './SignOutPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignOutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignOutPage />)
    }).not.toThrow()
  })
})
