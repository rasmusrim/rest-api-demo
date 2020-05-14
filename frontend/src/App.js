import React, { useState, useEffect } from 'react';
import './App.scss';
import StudentList from "./components/StudentList"

import StudentRepository from "./repositories/StudentRepository";
import AbsenceRepository from "./repositories/AbsenceRepository"

import moment from 'moment';

function App() {
  const [students, setStudents] = useState([]);
  const [month, setMonth] = useState(moment());

  useEffect(() => {
    StudentRepository.getAllStudentsWithAbsenceFor(month).then(students => {
      setStudents(students)
      console.log(students)
    });
  }, []);


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


      <StudentList students={students} month={month} />
    </div>
  );
}

export default App;
