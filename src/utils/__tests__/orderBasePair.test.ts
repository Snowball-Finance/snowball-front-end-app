import { orderBasePair } from 'utils/orderBasePair'
import { JOE, PNG, WAVAX } from "utils/constants"


describe('(utils/orderBasePair.ts)', () => {
  it('should return the correct order', () => {
    const result = orderBasePair([JOE, WAVAX])
    expect(result).toEqual([WAVAX, JOE])
  })

  it('should return the correct order', () => {
    const result = orderBasePair([JOE, PNG])
    expect(result).toEqual([PNG, JOE])
  })

})