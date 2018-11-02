import { cmfCollectionPath } from '../constants/cmf'

export function isFeatureEnabled(state, feature, path = cmfCollectionPath) {
  return state.getIn(path.concat(feature))
}

export function getFeatures(state, path = cmfCollectionPath) {
  return state.getIn(path)
}

export default {
  isFeatureEnabled,
  getFeatures
}
