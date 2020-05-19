import React from 'react';
import Student from "./Student"
import DatesHeaderRow from "./DatesHeaderRow"
import StudentAbsenceCells from "./StudentAbsenceCells"

import { connect } from 'react-redux'

function StudentList({ month, students, setStudents }) {

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
        students: state.students,
        
    };
}

export default connect(mapStateToProps)(StudentList);

