import './templates/index.ejs';
import './styles/app.less';
import App from './components/app.jsx';
import {form} from './reducers/form';
import {results} from './reducers/results';
import {fetchResults} from './actions/results';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
    form: {
        search: ''
    },
    results: {
        request: '',
        items: [],
        status: '',
        error: null
    }
};

import fetch from 'isomorphic-fetch';
import {resultsRequest, resultsFailure, resultsSuccess} from './actions/results';
const createStoreWithMiddleware = applyMiddleware(store => next => action => {
    if (action.type === 'CHANGE_FIELD') {
        store.dispatch(resultsRequest(action.value));
        fetch('http://localhost:31288/v1/search/' + action.value, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        })
        .then(data => {
            if (data.error) {
                store.dispatch(resultsFailure(data.error));
            } else {
                store.dispatch(resultsSuccess(data.result.results));
            }
        });
        return next(action);
    }
    next(action);
})(createStore);

const store = createStoreWithMiddleware(combineReducers({
    form, results
}), initialState, env === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(function() {
    var state = store.getState();
    if (state.form.search && state.form.search !== state.results.request) {

    }
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
