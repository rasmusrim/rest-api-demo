import React from 'react';
import AbsenceCodeSelector from './AbsenceCodeSelector'

export default function StudentAbsenceCells({ month, student, studentAbsenceCellClicked, showAbsenceCodeSelectorDate, saveStudentAbsence }) {
    let currentDay = month.clone().startOf('month').clone();

    let output = [];

    let i = 0;

    const absenceCodeSelected = (date, code) => {
        saveStudentAbsence(student, date, code)
    }

    while (currentDay.month() === month.month()) {
        let date = currentDay.toISOString();
        let key = "student-" + student.id + "-absence-" + currentDay.date()

        output.push(<td key={key} onClick={() => studentAbsenceCellClicked(student, date)}>
            {showAbsenceCodeSelectorDate && showAbsenceCodeSelectorDate.toISOString() === date && (
                <AbsenceCodeSelector absenceCodeSelected={(code) => absenceCodeSelected(date, code)} date={date} />
            )}
        </td>)
        currentDay.add(1, 'day')
        i++;
    }

    return output;

}