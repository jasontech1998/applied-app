import React, {Component} from 'react';
import * as actionCreators from '../../store/actions/actionTypes';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Logout extends Component {

componentDidMount = () => {
 this.props.logOutHandler();
}

  render () {
    return (
      <Redirect to='/' />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOutHandler: () => dispatch(actionCreators.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);