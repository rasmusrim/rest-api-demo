import { SET_STUDENTS, UPDATE_STUDENT, ADD_STUDENT, DELETE_STUDENT } from '../actions/StudentActions';
import _ from 'lodash'

export default function studentReducer(state = [], action) {
    console.log("Reducer: " + action.type)
    let newStudents;

    switch (action.type) {
        case SET_STUDENTS:
            return action.students;

        case UPDATE_STUDENT:
            newStudents = _.cloneDeep(state);
            newStudents[action.student.id] = action.student;

            console.log(newStudents)

            return newStudents;

        case ADD_STUDENT:
            newStudents = _.cloneDeep(state);
            newStudents[action.student.id] = action.student;

            return newStudents;

        case DELETE_STUDENT:
            newStudents = _.cloneDeep(state);
            delete newStudents[action.student.id]
            return newStudents

        default:
            return state
    }
}
