import { render } from '@redwoodjs/testing/web'

import PredictionsPage from './PredictionsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PredictionsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PredictionsPage />)
    }).not.toThrow()
  })
})
