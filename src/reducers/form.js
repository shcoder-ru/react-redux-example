import {CHANGE_FIELD} from '../actions/form';

export function form(state = {}, action) {
    if (action.type === CHANGE_FIELD) {
        return {...state, [action.name]: action.value};
    }
    return state;
}
