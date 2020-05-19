import React, { useState, useRef, useEffect } from 'react';
import Student from "./Student"
import DatesHeaderRow from "./DatesHeaderRow"
import StudentAbsenceCells from "./StudentAbsenceCells"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import { addStudent } from '../actions/StudentActions'

import { connect } from 'react-redux'
import StudentRestService from '../restServices/StudentRestService';

var random = require('random-name')

function StudentList({ month, students, addStudent }) {

    const [isNewFormShowing, setNewFormShowing] = useState(false);
    const [firstName, setFirstName] = useState(random.first());
    const [lastName, setLastName] = useState(random.last());
    const lastNameInputText = useRef(null);

    useEffect(() => {
        if (isNewFormShowing) {
            lastNameInputText.current.focus();
        }
    }, [isNewFormShowing])

    const addStudentClicked = function () {

        StudentRestService.addStudent(firstName, lastName).then(response => {
            response.absence = new Map();
            addStudent(response)
            setFirstName(random.first());
            setLastName(random.last());
            setNewFormShowing(false)
        })
    }

    const keyPressed = (e) => {
        if (e.keyCode === 13 && isNewFormShowing) {
            addStudentClicked();
        }


    }

    let studentsArray = Object.values(students);
    console.log(students)
    
    studentsArray = studentsArray.sort((a, b) => {
        if (a.lastName > b.lastName) {
            return 1;
        }
        if (a.lastName < b.lastName) {
            return -1;
        }

        return 0;

    })

    let html = (
        <>
            <table border="1">
                <thead>
                    <tr>
                        <td>Last name</td>
                        <td>First name</td>
                        <td>Actions</td>
                        <DatesHeaderRow month={month} />

                    </tr>
                </thead>
                <tbody>
                    {studentsArray.map(student => {

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
                    {!isNewFormShowing && (
                        <tr>
                            <td>
                                <FontAwesomeIcon icon={faPlus} onClick={() => setNewFormShowing(true)} className={"pointer"} />
                            </td>
                        </tr>
                    )}

                    {isNewFormShowing && (
                        <tr>
                            <td>
                                <input onKeyDown={keyPressed} ref={lastNameInputText} value={lastName} placeholder={"Last name"} onChange={event => setLastName(event.target.value)} />
                            </td>

                            <td>
                                <input onKeyDown={keyPressed} value={firstName} placeholder={"First name"} onChange={event => setFirstName(event.target.value)} />
                            </td>

                            <td colSpan="31">
                                <FontAwesomeIcon icon={faCheck} className={"pointer"} onClick={addStudentClicked} />
                                <FontAwesomeIcon icon={faTimes} className={"pointer"} onClick={() => setNewFormShowing(false)} />

                            </td>
                        </tr>
                    )}

                </tbody>
            </table>

        </>)

    return html;

}

function mapStateToProps(state, ownProps) {
    return {
        month: state.month,
        students: state.students,

    };
}

const mapDispatchToProps = dispatch => {
    return {
        addStudent: (student) => {
            dispatch(addStudent(student))
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(StudentList);

