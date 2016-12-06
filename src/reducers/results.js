import { FETCH_RESULTS_REQUEST, FETCH_RESULTS_FAILURE, FETCH_RESULTS_SUCCESS } from '../actions/results';

export function results(state = {}, action) {
    if (action.type === FETCH_RESULTS_REQUEST) {
        return {...state, status: action.status, request: action.request};
    }
    if (action.type === FETCH_RESULTS_FAILURE) {
        return {...state, status: action.status, error: action.error};
    }
    if (action.type === FETCH_RESULTS_SUCCESS) {
        return {...state, status: action.status, items: action.items};
    }
    return state;
}
