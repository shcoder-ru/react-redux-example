import './templates/index.ejs';
import './styles/app.less';
import App from './components/app.jsx';
import {form} from './reducers/form';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
    form: {}
};

const store = createStore(combineReducers({
    form
}), initialState);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
