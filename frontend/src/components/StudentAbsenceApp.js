import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import StudentList from "./StudentList"
import Toolbar from "./Toolbar"

import { setStudents } from '../actions/StudentActions'

import StudentRestService from '../restServices/StudentRestService'

function StudentAbsenceApp({ month, setStudents }) {
    useEffect(() => {
        StudentRestService.getAllStudentsWithAbsenceFor(month).then(students => {
            setStudents(students)
        });
    }, [month, setStudents]);

    return (
        <>
            <Toolbar />
            <StudentList />
        </>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        month: state.month
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setStudents: students => {

            dispatch(setStudents(students))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentAbsenceApp);


