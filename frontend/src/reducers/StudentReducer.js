import { SET_STUDENTS } from '../actions/StudentActions';

export default function studentReducer(state = [], action) {
    switch (action.type) {
        case SET_STUDENTS:
            return action.students;
        default:
            return state
    }
}
