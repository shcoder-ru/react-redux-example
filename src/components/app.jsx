import React from 'react';
import {connect} from 'react-redux';
import Form from './form.jsx';

class App extends React.Component {

    render() {
        return (
            <div className="container">
                <h2>Form:</h2>
                <Form/>
                <h3>State:</h3>
                <xmp>{JSON.stringify(this.props, null, 4)}</xmp>
            </div>
        );
    }

}

export default connect((state) => {
    return {...state};
})(App);
