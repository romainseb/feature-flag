import Immutable from 'immutable'
import { isFeatureEnabled, getFeatures } from './selectors'

const state = Immutable.fromJS({
  cmf: { collections: { features: { feat1: true, feat2: false } } }
})

describe('isFeatureEnabled', () => {
  it('should return false if the feature is not enabled', () => {
    // given
    const featureName = 'feat2'
    // when
    const result = isFeatureEnabled(state, featureName)
    // then
    expect(result).toBeFalsy()
  })

  it('should return false if the feature is not present', () => {
    // given
    const featureName = 'feat4'
    // when
    const result = isFeatureEnabled(state, featureName)
    // then
    expect(result).toBeFalsy()
  })

  it('should return true if the feature is enabled', () => {
    // given
    const featureName = 'feat1'
    // when
    const result = isFeatureEnabled(state, featureName)
    // then
    expect(result).toBeTruthy()
  })
})

describe('getFeatures', () => {
  it('should return the features', () => {
    // given
    // when
    const features = getFeatures(state)
    // then
    expect(features).toEqual(Immutable.Map({ feat1: true, feat2: false }))
  })
})
