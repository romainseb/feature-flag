import { isFeatureEnabled } from '../selectors'

function isFeatureEnabledExp({ context }, featureName) {
  const state = context.store.getState()
  return isFeatureEnabled(state, featureName)
}

export default {
  isFeatureEnabled: isFeatureEnabledExp
}
