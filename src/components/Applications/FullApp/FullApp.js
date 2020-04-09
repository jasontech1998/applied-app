import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './FullApp.module.css';
import axios from '../../../axios-apps';
import * as actionCreators from '../../../store/actions/actionTypes';

class FullApp extends Component {
  state = {
    isUpdate: false
  }

  handleDelete = (id, token) => {
    axios.delete(`https://job-search-app-73b30.firebaseio.com/applications/${id}.json?auth=${token}`)
      .then(response => {
        console.log(response)
      })
    this.props.history.push('/confirmation')
  }
  responseHandler = (event, id) => {
    const responseData = {responseData: event.target.value};
    this.props.editAppHandler(responseData, id, this.props.token)
    this.props.history.push('/confirmation')
  }
  updateHandler = () => {
    this.setState({
      isUpdate: !this.state.isUpdate
    })
  }


  render () {
    var sortedApps = this.props.applications.slice(0);
        sortedApps.sort(function(a,b) {
          return (a.id < b.id ? -1: 1);
        })

    let appIndex = this.props.match.params.index
    let chosenApp = sortedApps[appIndex];
    let isInfo = chosenApp.application.info !== '';
    let isURL = chosenApp.application.url !== '';
    let tempDate = chosenApp.application.date.toString().slice(0,10);
    let fixedDate = tempDate.substr(5,6) + '-' + tempDate.substr(0,4);
    let response = chosenApp.application.responseData;
    if (response === undefined) {
      response = 'No Response'
    }
    return (
      <div className="text-center">
        <h3>Full App</h3>
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className={classes.FullApp}>
                <div className="card">
                  <div className="card-header">
                    {fixedDate}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title" style={{textDecoration: 'underline'}}>Company Name</h5>
                    <p className="card-text">{chosenApp.application.company}</p>
                    <h5 className="card-title" style={{textDecoration: 'underline'}}>Job Title</h5>
                    <p className="card-text">{chosenApp.application.role}</p>
                    <h5 className="card-title" style={{textDecoration: 'underline'}}>Location</h5>
                    <p className="card-text">{chosenApp.application.location}</p>
                    {isInfo
                    ? <div>
                        <h5 className="card-title" style={{textDecoration: 'underline'}}>Useful Information</h5>
                        <p className="card-text">{chosenApp.application.info}</p>
                      </div>
                    : null
                    }
                    <div className="card-body">
                      <h5 className="card-title" style={{textDecoration: 'underline'}}>Response</h5>
                      <p className="card-text">{response}</p>
                    </div>
                    {this.state.isUpdate
                     ? <div className="card-body">
                        <h5 className="card-title" style={{textDecoration: 'underline'}}>Update Response</h5>
                        <select 
                          onChange={(event) => this.responseHandler(event, chosenApp.id)}
                          className="form-control"
                          defaultValue={'DEFAULT'}>
                          <option value="DEFAULT" disabled hidden>Choose here</option>
                          <option value="No Response">No Response</option>
                          <option value="Online Assessment">Online Assessment</option>
                          <option value="Phone Interview">Phone Interview</option>
                          <option value="On Site Interview">On Site Interview</option>
                          <option value="Rejected :'(">Rejected</option>
                        </select>
                      </div>
                      : null
                    }
                    {isURL
                      ? <div className="card-body">
                          <a href={chosenApp.application.url}>Go to application site</a>
                        </div>
                      : null
                    }
                    
                  </div>
                  <div className="my-3">
                    <button 
                      style={{backgroundColor: '#005082',
                              borderColor: '#005082'}} 
                      className="btn btn-primary mr-2" 
                      onClick={this.updateHandler}>{this.state.isUpdate ? 'Close Update' : 'Update'}</button>
                    <button className="btn btn-danger" onClick={() => this.handleDelete(chosenApp.id, this.props.token)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      
    )
  }
}
const mapStateToProps = state => {
  return {
    applications: state.app.applications,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editAppHandler: (responseData, id, token) => dispatch(actionCreators.editApp(responseData, id, token)) 
  }
}
export default connect(mapStateToProps ,mapDispatchToProps)(FullApp);