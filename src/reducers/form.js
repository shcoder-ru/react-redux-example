import {CHANGE_FIELD} from '../actions/change-form';

export function form(state = {}, action) {
    if (action.type === CHANGE_FIELD) {
        let field = {};
        field[action.name] = action.value;
        return {...state, ...field};
    }
    return state;
}
