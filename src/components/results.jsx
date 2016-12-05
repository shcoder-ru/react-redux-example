import React from 'react';
import {connect} from 'react-redux';

class Results extends React.Component {

    render() {
        let results = this.props.results;
        switch (results.status) {
            case 'request':
                return <div className="load">Load...</div>;
                break;
            case 'error':
                return <div className="error">{this.props.results.error}</div>;
                break;
            case 'success':
                return (
                    <ul>
                        {this.props.results.items ? this.props.results.items.map((item, key) => <li key={key}>{item}</li>) : []}
                    </ul>
                );
                break;
            default:
                return <div/>;
                break;
        }
    }

}

export default connect((state) => {
    return { results: state.results };
})(Results);
