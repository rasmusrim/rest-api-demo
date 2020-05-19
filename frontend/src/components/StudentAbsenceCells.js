import React from 'react';
import AbsenceCodeSelector from './AbsenceCodeSelector'
import StudentAbsenceCell from './StudentAbsenceCell'
import moment from 'moment';
import { connect } from 'react-redux'

import { setActiveAbsenceTypeSelector } from '../actions/AbsenceTypeSelectorActions'
import { updateStudent } from '../actions/StudentActions'
import AbsenceRestService from '../restServices/AbsenceRestService';

function StudentAbsenceCells({ month, student, setActiveAbsenceTypeSelector, activeAbsenceTypeSelector, updateStudent }) {
    let currentDay = moment(month).startOf('month');
    let output = [];

    const absenceCodeSelected = (date, code) => {
        AbsenceRestService.setAbsence(student, date, code).then(response => {
            student.absence.set(date, response)
            updateStudent(student)
            setActiveAbsenceTypeSelector({})
        })
    }

    while (currentDay.month() === moment(month).month()) {
        let date = currentDay.format('YYYY-MM-DD');
        let key = "student-" + student.id + "-absence-" + date
        let absenceEntry = student.absence.get(date);

        let showAbsenceCodeSelector = activeAbsenceTypeSelector && activeAbsenceTypeSelector.date === date && activeAbsenceTypeSelector.studentId === student.id
        
        output.push(
            <td key={key} onClick={() => setActiveAbsenceTypeSelector(student.id, date)}>
                { showAbsenceCodeSelector && (
                    <AbsenceCodeSelector absenceCodeSelected={(code) => absenceCodeSelected(date, code)} date={date} />
                )}

                <StudentAbsenceCell absenceEntry={absenceEntry} />
            </td>)
        currentDay.add(1, 'day')
    }

    return output;

}

function mapStateToProps(state, ownProps) {
    return {
        activeAbsenceTypeSelector: state.activeAbsenceTypeSelector,
        month: state.month        
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveAbsenceTypeSelector: (studentId, date) => {
            dispatch(setActiveAbsenceTypeSelector(studentId, date))
        },
        updateStudent: (student) => {
            dispatch(updateStudent(student))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentAbsenceCells);

