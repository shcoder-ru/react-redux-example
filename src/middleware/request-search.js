import fetch from 'isomorphic-fetch';
import {resultsRequest, resultsFailure, resultsSuccess} from '../actions/results';

const requestSearch = store => next => action => {
    next(action);
    if (action.type === 'CHANGE_FIELD') {
        store.dispatch(resultsRequest(action.value));
        if (!action.value) {
            return store.dispatch(resultsSuccess([]));
        }
        fetch('http://localhost:31288/v1/search/' + action.value, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.error) {
                store.dispatch(resultsFailure(data.error));
            } else {
                store.dispatch(resultsSuccess(data.result.results));
            }
        }).catch(error => {
            store.dispatch(resultsFailure(error));
        });
    }
}

export default requestSearch;