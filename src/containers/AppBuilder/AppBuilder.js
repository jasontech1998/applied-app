import React, {Component} from 'react';
import Form from '../../components/Form/Form';
import Modal from '../../components/UI/Modal/Modal';
import AppSummary from '../../components/AppSummary/AppSummary';
import Auth from '../Auth/Auth';
import classes from './AppBuilder.module.css';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionTypes';


class AppBuilder extends Component {

  appHandler = () => {
    const application = {
        company: this.props.companyName,
        role: this.props.jobTitle,
        info: this.props.usefulInfo,
        location: this.props.location,
        url: this.props.postURL,
        date: this.props.startDate
    }
    const submittedApp = {
      application: application,
      userId: this.props.userId
    }
    this.props.addAppHandler(submittedApp, this.props.token)

  }
  render () {
    let enterApp = <Auth />
    if (this.props.token !== null) {
      enterApp = (
        <div>
          <h3 className="text-center">Enter Application Info</h3>
          <div className="container">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <Form 
                  onSubmit={(e) => this.props.submitAppHandler(e)}
                  onChange={(e) => this.props.userInputHandler(e)}
                  companyName={this.props.companyName}
                  jobTitle={this.props.jobTitle}
                  usefulInfo={this.props.usefulInfo}
                  location={this.props.location}
                  postURL={this.props.postURL}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.AppBuilder}>
        <Modal 
          show={this.props.submitting}
          closeModal={this.props.closeModalHandler}>
          <AppSummary 
            companyName={this.props.companyName}
            jobTitle={this.props.jobTitle}
            usefulInfo={this.props.usefulInfo}
            startDate={this.props.startDate}
            postURL={this.props.postURL}
            location={this.props.location}
            loading={this.props.loading}
            submitted={this.appHandler}
            canceled={this.props.closeModalHandler}
            />
        </Modal>
        {enterApp}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    companyName: state.app.companyName,
    jobTitle: state.app.jobTitle,
    location: state.app.location,
    postURL: state.app.postURL,
    usefulInfo: state.app.usefulInfo,
    startDate: state.app.startDate,
    submitting: state.app.submitting,
    loading: state.app.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userInputHandler: (e) => dispatch(actionCreators.userInput(e)),
    addAppHandler: (appData, token) => dispatch(actionCreators.addApp(appData, token)),
    submitAppHandler: (e) => dispatch(actionCreators.submitApp(e)),
    closeModalHandler: () => dispatch(actionCreators.closeModal())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppBuilder);