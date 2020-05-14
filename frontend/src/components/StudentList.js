import React, { useState } from 'react';
import Student from "./Student"
import DatesHeaderRow from "./DatesHeaderRow"
import StudentAbsenceCells from "./StudentAbsenceCells"

import StudentRepository from "../repositories/StudentRepository"

import AbsenceService from "../services/AbsenceService"

import moment from 'moment';

export default function StudentList({ students, month }) {

    const [absence, setAbsence] = useState(new Map());
    const [activeAbsenceTypeSelector, setActiveAbsenceTypeSelector] = useState({});

    const showStudentAbsenceSelector = async function (student, date) {
        date = moment(date)
        const absenceTypeSelector = {
            student: student,
            date: date
        }

        setActiveAbsenceTypeSelector(absenceTypeSelector);

    }

    const saveStudentAbsence = (student, date, code) => {
        StudentRepository.setAbsence(student, date, code).then(() => {
            console.log("Saved")
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
                {students.map(student => {
                    
                    return (
                        <tr key={student.id}>
                            <Student student={student} />
                            
                            <StudentAbsenceCells 
                                showAbsenceCodeSelectorDate={(typeof activeAbsenceTypeSelector.student !== "undefined" && student.id == activeAbsenceTypeSelector.student.id) ? activeAbsenceTypeSelector.date : null}  
                                studentAbsenceCellClicked={showStudentAbsenceSelector} 
                                month={month} 
                                student={student}
                                saveStudentAbsence={saveStudentAbsence} />

                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    return html;

}