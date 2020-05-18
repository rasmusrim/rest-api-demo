import React from 'react';
import StudentAbsenceApp from './components/StudentAbsenceApp'
import './App.scss';
import { createStore } from 'redux'
import { Provider} from 'react-redux'
import mainReducer from "./reducers/MainReducer"
import moment from 'moment';

const store = createStore(mainReducer, { month: moment().format('YYYY-MM')})

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <StudentAbsenceApp />
      </Provider>
    </div>
  )
}