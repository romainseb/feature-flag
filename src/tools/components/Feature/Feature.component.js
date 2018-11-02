import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { cmfConnect } from '@talend/react-cmf'
import { cmfCollectionPath } from '../../../constants/cmf'

export function Feature({
  enabled, features, children, placeholder
}) {
  if (!enabled) {
    return placeholder || null
  }
  return children && React.cloneElement(children, { features })
}

Feature.displayName = 'Feature'
Feature.propTypes = {
  name: PropTypes.string,
  enabled: PropTypes.bool.isRequired,
  statePath: PropTypes.arrayOf(PropTypes.string),
  ...cmfConnect.propTypes
}

export const mapStateToProps = (state, ownProps) => {
  const features = state.getIn(ownProps.statePath || cmfCollectionPath, Immutable.Map())
  return {
    features,
    enabled: ownProps.name ? features.get(ownProps.name) : true
  }
}

export default cmfConnect({ mapStateToProps })(Feature)
