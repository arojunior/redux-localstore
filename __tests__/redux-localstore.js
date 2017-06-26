import storeSynchronize from '../src'

const store = {
  dispatch: () => {},
  subscribe: fn => fn,
  getState: () => {}
}

describe('General test', () => {
  it('Should not throw an error', () => {
    expect(storeSynchronize(store)).toBeDefined()
  })
})
