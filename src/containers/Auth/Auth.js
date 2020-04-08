import React, {Component} from 'react';
import classes from './Auth.module.css';
import * as actionCreators from '../../store/actions/actionTypes';
import {connect} from 'react-redux';

class Auth extends Component {
  state = {
    email: '',
    password: '',
    isSignUp: false
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.email.length === 0 || this.state.password === 0) {
      alert('Please fill out the entire form!')
    }
    else if(this.state.password.length < 6) {
      alert('Password must be atleast 6 characters in length')
    }
    this.props.onAuth(this.state.email, this.state.password, this.state.isSignUp)
    
  }
  signUpHandler = () => {
    this.setState({
      ...this.state,
      isSignUp: !this.state.isSignUp
    })
  }
  render () {
    let errorMsg = null;
    
    if(this.props.error) {
      if(this.props.error.message === 'INVALID_PASSWORD') {
        errorMsg = (
          <div>
            <p><i className="fas fa-exclamation-circle"></i><strong> Let's try that again</strong></p>
            <p>The password you entered is incorrect. Try again, or choose another login option.</p>
          </div>
        )
      }
      else if (this.props.error.message === 'EMAIL_NOT_FOUND') {
        errorMsg = (
          <div>
            <p><i class="fas fa-exclamation-circle"></i><strong> Let's try that again</strong></p>
            <p>The email you entered is incorrect. Try again, or choose another login option.</p>
          </div>
        )
      }
      else if (this.props.error.message === 'EMAIL_EXISTS') {
        errorMsg = (
          <div>
            <p><i class="fas fa-exclamation-circle"></i><strong> Let's try that again</strong></p>
            <p>The email you entered already exists.</p>
          </div>
        )
      }
    } 
    return (
      <div className="container">
        {this.state.isSignUp
         ? <h3 className="text-center">Sign Up</h3>
         : <h3 className="text-center">Log In</h3>
        }
        <div className="row">
          <div className="col d-flex justify-content-center">
            <form className={classes.Auth} onSubmit={(event) => this.onSubmitHandler(event)}>
              <div className='form-group'>
                {errorMsg}
                <label>Email</label>
                <input 
                onChange={(event) => this.onChange(event)}
                value={this.state.email}
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter Email"/>
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input 
                onChange={(event) => this.onChange(event)}
                value={this.state.password}
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Password"/>
                <small className="form-text text-muted">Minimum of 6 characters</small>
              </div>
              <div className="text-center">
                <button 
                  style={{backgroundColor: '#005082',
                  borderColor: '#005082'}}
                  type="submit" 
                  className="btn btn-primary">{this.state.isSignUp ? 'Sign Up' : 'Log In'}</button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center">
          <button 
            style={{backgroundColor: '#bae8e8',
            borderColor: '#005082',
            color: 'black'}}
            className="btn btn-primary" href="" 
            onClick={this.signUpHandler}>{this.state.isSignUp ? 'Switch to Log In' : 'Switch to Sign Up'}</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);