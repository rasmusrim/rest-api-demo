import { combineReducers } from 'redux'

import monthReducer from './MonthReducer'
import studentReducer from './StudentReducer'

const mainReducer = combineReducers({
  month: monthReducer,
  students: studentReducer
})

export default mainReducer