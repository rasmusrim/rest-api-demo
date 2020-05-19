import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { deleteStudent, updateStudent } from '../actions/StudentActions'
import StudentRestService from '../restServices/StudentRestService'

import { connect } from 'react-redux'
function Student({ student, deleteStudent, updateStudent }) {

    const [editMode, setEditMode] = useState(false);
    const [newFirstName, setNewFirstName] = useState(student.firstName);
    const [newLastName, setNewLastName] = useState(student.lastName);
    const lastNameTextInput = useRef(null);

    useEffect(() => {

        if (editMode) {
            lastNameTextInput.current.focus();
        }
    }, [editMode])

    const deleteStudentClicked = () => {
        if (window.confirm("Do you really want to delete " + student.firstName + " " + student.lastName + "?")) {
            StudentRestService.deleteStudent(student).then(response => {
                deleteStudent(student)
            })
        }
    }

    const updateStudentClicked = () => {
        student.lastName = newLastName;
        student.firstName = newFirstName;

        StudentRestService.updateStudent(student).then(response => {
            response.absence = student.absence;
            updateStudent(response)
            setEditMode(false)
        })
    }

    const keyPressed = (e) => {
        if (e.keyCode === 13 && editMode) {
            updateStudentClicked();
        }
        
    }

    return (
        <>
            {!editMode && (
                <>
                    <td>{student.lastName}</td>
                    <td>{student.firstName}</td>
                </>
            )}

            {editMode && (
                <>
                    <td>
                        <input onKeyDown={keyPressed} value={newLastName} onChange={event => setNewLastName(event.target.value)} ref={lastNameTextInput}/>
                    </td>
                    <td>
                        <input onKeyDown={keyPressed} value={newFirstName} onChange={event => setNewFirstName(event.target.value)} />
                        <FontAwesomeIcon icon={faCheck} className={"pointer"} onClick={updateStudentClicked} />
                        <FontAwesomeIcon icon={faTimes} className={"pointer"} onClick={() => setEditMode(false)} />


                    </td>
                </>
            )}

            <td>
                <FontAwesomeIcon icon={faTrash} className={"pointer"} onClick={deleteStudentClicked} />
                <FontAwesomeIcon icon={faPencilAlt} className={"pointer"} onClick={() => setEditMode(true) } />
            </td>
        </>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        deleteStudent: student => {
            dispatch(deleteStudent(student))
        },
        updateStudent: student => {
            dispatch(updateStudent(student))
        }

    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
