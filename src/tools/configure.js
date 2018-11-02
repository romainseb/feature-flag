import api from '@talend/react-cmf'

import components from './components'
import sagas from './cmf/sagas'
import expressions from './cmf/expressions'

export default function defaultConfigure() {
  api.expression.registerMany(expressions)
  api.component.registerMany(components)
  api.sagas.registerMany(sagas)
}
