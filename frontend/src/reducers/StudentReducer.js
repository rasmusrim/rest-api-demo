import { SET_STUDENTS, UPDATE_STUDENT } from '../actions/StudentActions';
import _ from 'lodash'

export default function studentReducer(state = [], action) {
    switch (action.type) {
        case SET_STUDENTS:
            return action.students;
        case UPDATE_STUDENT:
            let newStudents = _.cloneDeep(state);
            newStudents[action.student.id] = action.student;

            return newStudents;

        default:
            return state
    }
}
