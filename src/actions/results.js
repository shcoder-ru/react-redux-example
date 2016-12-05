export const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_REQUEST';
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE';
export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';

export function resultsRequest(request) {
    return {
        type: FETCH_RESULTS_REQUEST,
        request: request,
        status: 'request'
    };
}

export function resultsFailure(error) {
    return {
        type: FETCH_RESULTS_FAILURE,
        error: error,
        status: 'error'
    };
}

export function resultsSuccess(items) {
    return {
        type: FETCH_RESULTS_SUCCESS,
        items: items,
        status: 'success'
    };
}
