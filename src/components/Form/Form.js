import React, {Component} from 'react';
import DatePicker from 'react-datepicker';

import classes from './Form.module.css';
import "react-datepicker/dist/react-datepicker.css";
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/actionTypes';

class Form extends Component {

  render() {
    return (
    <form className={classes.Form} onSubmit={(event) => this.props.onSubmit(event)}>
      <div className='form-group'>
        <label>Company Name</label>
          <input 
            onChange={this.props.onChange}
            value={this.props.companyName}
            className='form-control' 
            type='text' 
            name='companyName' 
            placeholder='Company Name'/>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label>Job Title</label>
            <input 
              onChange={this.props.onChange}
              value={this.props.jobTitle}
              className='form-control' 
              type='text' 
              name='jobTitle' 
              placeholder='Job Title'/>
          </div>
          <div className='form-group col-md-6'>
            <label>Location</label>
            <input 
              onChange={this.props.onChange}
              value={this.props.location}
              className='form-control' 
              type='text' 
              name='location' 
              placeholder='Location'/>
          </div>
        </div>
        <div className='form-group'>
          <label>Post url</label>
          <input 
              onChange={this.props.onChange}
              value={this.props.postURL}
              className='form-control' 
              type='text' 
              name='postURL' 
              placeholder='+add URL'/>
        </div>
        <div className='form-group text-center'>
          <label className="mr-3">Date Applied</label>
          <DatePicker selected={this.props.startDate} onChange={this.props.dateChange}/>
        </div>
        <div className='form-group'>
          <label className="align-center">Useful Information</label>
          <textarea 
            className="form-control" rows="3"
            onChange={this.props.onChange} 
            value={this.props.usefulInfo}
            name='usefulInfo'
            placeholder='Any preferred requirements or other useful information'/>
        </div>
        <div className="text-center">
          <button 
            style={{backgroundColor: '#005082',
            borderColor: '#005082'}}
            type="submit" 
            className="btn btn-primary">Submit</button>
      </div>
    </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    startDate: state.app.startDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dateChange: (date) => dispatch(actionCreators.dateChange(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);