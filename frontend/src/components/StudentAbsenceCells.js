import React from 'react';
import AbsenceCodeSelector from './AbsenceCodeSelector'
import StudentAbsenceCell from './StudentAbsenceCell'
import moment from 'moment';

export default function StudentAbsenceCells({ month, student, studentAbsenceCellClicked, showAbsenceCodeSelectorDate, saveStudentAbsence }) {
    let currentDay = moment(month).startOf('month');
    
    let output = [];

    const absenceCodeSelected = (date, code) => {
        saveStudentAbsence(student, date, code)
    }

    while (currentDay.month() === moment(month).month()) {
        let date = currentDay.format('YYYY-MM-DD');
        let key = "student-" + student.id + "-absence-" + date
        let absenceEntry = student.absence.get(date);

        let showAbsenceCodeSelector = showAbsenceCodeSelectorDate && showAbsenceCodeSelectorDate === date

        output.push(
            <td key={key} onClick={() => studentAbsenceCellClicked(student, date)}>
                { showAbsenceCodeSelector && (
                    <AbsenceCodeSelector absenceCodeSelected={(code) => absenceCodeSelected(date, code)} date={date} />
                )}

                <StudentAbsenceCell absenceEntry={absenceEntry} />
            </td>)
        currentDay.add(1, 'day')
    }

    return output;

}