import { CHANGE_MONTH } from '../actions/MonthActions';

export default function monthReducer(state = [], action) {
    switch (action.type) {

        case CHANGE_MONTH:
            return action.month;
        default:
            return state
    }
}
