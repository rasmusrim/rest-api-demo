import React, { useState, useEffect } from 'react';
import Student from "./Student"
import DatesHeaderRow from "./DatesHeaderRow"
import StudentAbsenceCells from "./StudentAbsenceCells"

import StudentRepository from "../repositories/StudentRepository"
import _ from 'lodash'

import moment from 'moment';

export default function StudentList({ month }) {

    const [activeAbsenceTypeSelector, setActiveAbsenceTypeSelector] = useState({});
    const [students, setStudents] = useState([]);

    useEffect(() => {
        StudentRepository.getAllStudentsWithAbsenceFor(month).then(students => {
            setStudents(students)
        });
    }, [month]);


    const studentAbsenceCellClicked = async function (student, date) {
        const activeAbsenceTypeSelector = {
            student: student,
            date: date
        }

        setActiveAbsenceTypeSelector(activeAbsenceTypeSelector);

    }

    const saveStudentAbsence = (student, date, code) => {
        StudentRepository.setAbsence(student, date, code).then((absence) => {
            let newStudents = _.cloneDeep(students);
            newStudents[absence.studentId].absence.set(moment(absence.date).format('YYYY-MM-DD'), absence)
            setStudents(newStudents)
            setActiveAbsenceTypeSelector({})

        });
    }



    let emptyColumns = [];
    for (let i = 0; i < 2; i++) {
        emptyColumns.push(<td key={"header-empty-cell-" + i}></td>);
    }

    let html = (
        <table border="1">
            <thead>
                <tr>
                    {emptyColumns}
                    <DatesHeaderRow month={month} />

                </tr>
            </thead>
            <tbody>
                {Object.values(students).map(student => {

                    return (
                        <tr key={student.id}>
                            <Student student={student} />

                            <StudentAbsenceCells
                                showAbsenceCodeSelectorDate={(typeof activeAbsenceTypeSelector.student !== "undefined" && student.id === activeAbsenceTypeSelector.student.id) ? activeAbsenceTypeSelector.date : null}
                                studentAbsenceCellClicked={studentAbsenceCellClicked}
                                month={month}
                                student={student}
                                saveStudentAbsence={saveStudentAbsence}

                            />

                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    return html;

}