import React, { useState, useEffect } from 'react';
import Student from "./Student"
import DatesHeaderRow from "./DatesHeaderRow"
import StudentAbsenceCells from "./StudentAbsenceCells"

import StudentRepository from "../repositories/StudentRepository"
import _ from 'lodash'

import setStudents from '../reducers/StudentReducer'

import { connect } from 'react-redux'

import moment from 'moment';

function StudentList({ month, students, setStudents }) {

    const [activeAbsenceTypeSelector, setActiveAbsenceTypeSelector] = useState({});

    const studentAbsenceCellClicked = async function (student, date) {
        const activeAbsenceTypeSelector = {
            student: student,
            date: date
        }

        setActiveAbsenceTypeSelector(activeAbsenceTypeSelector);

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
                            />

                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    return html;

}

function mapStateToProps(state, ownProps) {
    return {
        month: state.month,
        students: state.students
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setStudents: students => {
            
            dispatch(setStudents(students))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

