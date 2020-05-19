import { SET_ACTIVE_ABSENCE_TYPE_SELECTOR } from '../actions/AbsenceTypeSelectorActions';

export default function absenceTypeSelectorReducer(state = [], action) {
    switch (action.type) {

        case SET_ACTIVE_ABSENCE_TYPE_SELECTOR:
            return {
                date: action.date,
                studentId: action.studentId
            }
        default:
            return state
    }
}
