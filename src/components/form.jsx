import React from 'react';
import {connect} from 'react-redux';
import {changeField} from '../actions/form';

class Form extends React.Component {

    changeFieldHandler(event) {
        this.props.dispatch(changeField(event.target.name, event.target.value));
    }

    render() {
        return (
            <div className="form">
                <input type="text" name="search" value={this.props.form.search || ''} onChange={this.changeFieldHandler.bind(this)}/>
            </div>
        );
    }

}

export default connect((state) => {
    return { form: state.form };
})(Form);
