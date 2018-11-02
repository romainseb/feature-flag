import api from '@talend/react-cmf'
import { call, put } from 'redux-saga/effects'
import { apiFeatures } from '../../constants/api'
import { cmfCollectionName } from '../../constants/cmf'

export function* getFeatures() {
  const { response, data } = yield call(api.sagas.http.get, apiFeatures, undefined, {
    silent: true
  })
  if (response.ok) {
    yield put(api.actions.collections.addOrReplace(cmfCollectionName, data))
  } else {
    yield put(api.actions.collections.addOrReplace(cmfCollectionName, {}))
  }
}

export default {
  getFeatures
}
