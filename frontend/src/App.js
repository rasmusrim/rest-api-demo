import React, { useState, useEffect } from 'react';
import './App.scss';
import StudentList from "./components/StudentList"

import moment from 'moment';

function App() {
  const [month, setMonth] = useState(moment());

  const goToLastMonth = function () {
    let lastMonth = month.clone().subtract(1, 'months');
    setMonth(lastMonth);
  }

  const goToNextMonth = function () {
    let nextMonth = month.clone().add(1, 'months');
    setMonth(nextMonth);
  }

  return (
    <div className="App">
      {typeof month !== "undefined" && (
        <>
          <button onClick={goToLastMonth}>&lt;&lt; Last month</button>
          <span>{month.format("MMMM YYYY")}</span>
          <button onClick={goToNextMonth}>Next month &gt;&gt;</button>
        </>
      )}


      <StudentList month={month} />
    </div>
  );
}

export default App;
