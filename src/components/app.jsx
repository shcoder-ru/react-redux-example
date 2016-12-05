import React from 'react';
import {connect} from 'react-redux';
import Form from './form.jsx';
import Results from './results.jsx';

class App extends React.Component {

    render() {
        return (
            <div className="container">
                <h2>Search:</h2>
                <Form/>
                <h2>Results:</h2>
                <Results/>
                <h3>State:</h3>
                <xmp>{JSON.stringify(this.props, null, 4)}</xmp>
            </div>
        );
    }

}

export default connect((state) => {
    return {...state};
})(App);
