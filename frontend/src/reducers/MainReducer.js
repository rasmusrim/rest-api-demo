import { combineReducers } from 'redux'

import monthReducer from './MonthReducer'
import studentReducer from './StudentReducer'
import absenceTypeSelectorReducer from './AbsenceTypeSelectorReducer'

const mainReducer = combineReducers({
  month: monthReducer,
  students: studentReducer,
  activeAbsenceTypeSelector: absenceTypeSelectorReducer
})

export default mainReducer