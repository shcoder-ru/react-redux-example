import './templates/index.ejs';
import './styles/app.less';
import App from './components/app.jsx';
import {form} from './reducers/form';
import {results} from './reducers/results';
import {fetchResults} from './actions/results';
import requestSearch from './middleware/request-search';

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

const createStoreWithMiddleware = applyMiddleware(requestSearch)(createStore);
const store = createStoreWithMiddleware(combineReducers({
    form, results
}), initialState, env === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
