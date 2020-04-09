import React, {Component} from 'react';
import classes from './Applications.module.css';
import Aux from '../../hoc/Aux';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionTypes';
import {Route} from 'react-router-dom';
import FullApp from './FullApp/FullApp';
import { findAllByPlaceholderText } from '@testing-library/react';

class Applications extends Component {
  state = {
    viewFullApp: false,
    appIndex: ''
  }

  componentDidMount() {
    this.props.onFetchApps(this.props.token, this.props.userId);
  }
  viewFullApp = (index) => {
    if (!this.state.viewFullApp) {
      this.setState({
          viewFullApp: !this.state.viewFullApp,
          appIndex: index})
      this.props.history.push( '/apps/' + index);
    }
    else if (this.state.appIndex !== index){
      this.setState({
          appIndex: index})
      this.props.history.push('/apps/' + index)
    }
    else {
      this.setState({
        viewFullApp: !this.state.viewFullApp,
        appIndex: ''
      })
      this.props.history.push('/apps')
    }
  }
  goHome = () => {
    this.props.history.push('/');
  }
  render () {
        // Reorder by ID number in case data is received out of order
        var sortedApps = this.props.applications.slice(0);
        sortedApps.sort(function(a,b) {
          return (a.id < b.id ? -1: 1);
        })
    let displayApps = (
      <Aux>
        {sortedApps.map((app, index) => {
          let tempDate = app.application.date.toString().slice(0,10);
          let fixedDate = tempDate.substr(5,6) + '-' + tempDate.substr(0,4);
          let isUrl =  app.application.url !== ''; 
          return (
              <tr key={app + index}>
                <td>{app.application.company}</td>
                <td>{app.application.role}</td>
                <td>{app.application.location}</td>
                <td>{isUrl
                        ? <a href={app.application.url}><i className="fas fa-link"></i></a>
                        : 'N/A'}</td>
                <td>{fixedDate}</td>
                <td><button
                      className="btn btn-outline-info"
                      onClick={() => this.viewFullApp(index)}>{(this.state.viewFullApp && this.state.appIndex === index) ? 'Close Full App' : 'Application'}</button></td>
              </tr>
          )
        })}
      </Aux>
    );
    
    // if user is auth, show 
    let showApps = null;
    if (this.props.token !== null && !this.props.error) {
      showApps = (
        <div className="container">
          <h3 className="text-center">Pending Applications</h3>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <table className={classes.Applications}>
                <thead>
                  <tr>
                    <th scope="col">Company Name</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Location</th>
                    <th scope="col">URL</th>
                    <th scope="col">Date Submitted</th>
                    <th scope="col">View Full Application</th>
                  </tr>
                </thead>
                <tbody>
                  {displayApps}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
    // If there are no applications in the database or there was an error
    let noApps = null;
    if (this.props.applications.length === 0 && !this.props.error) {
      noApps = (
        <div className="text-center">
          <p>You have no pending applications...</p>
          <button 
            style={{backgroundColor: '#005082',
                    borderColor: '#005082'}}
            className="btn btn-primary" 
            onClick={this.goHome}>Click to submit application</button>
        </div>
      )
    }
    

    return (
      <div>
        {showApps}
        {noApps}
        <Route path={this.props.match.url + '/:index'} component={FullApp}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    applications: state.app.applications,
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.app.error !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchApps: (token, userId) => dispatch(actionCreators.fetchApps(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);