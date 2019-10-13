import { add } from '@libs/shared'
import fn from '../src'

describe(`one > smth`, () => {
  it(`works`, () => {
    expect(fn).toBeDefined()
  })

  it(`imports deps`, () => {
    expect(typeof add(2, 3)).toBe('number')
  })
})
