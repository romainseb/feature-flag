import Immutable from 'immutable'
import { cmfCollectionPath } from '../constants/cmf'

export function isFeatureEnabled(state, feature, path = cmfCollectionPath) {
  return state.getIn(path.concat(feature))
}

export function getFeatures(state, path = cmfCollectionPath) {
  return state.getIn(path, Immutable.Map())
}

export default {
  isFeatureEnabled,
  getFeatures
}
