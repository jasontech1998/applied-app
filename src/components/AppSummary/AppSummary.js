import React from 'react';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';

const appSummary = (props) => {
  
  let fixedDate = props.startDate.toString().slice(0,15);
  let summary = (
      <div>
        <h3>Your Application</h3>
        <p>Please review your application summary</p>
        <hr></hr>
        <p><strong>Company Name:</strong> {props.companyName}</p>
        <p><strong>Job Title:</strong> {props.jobTitle}</p>
        <p><strong>Location:</strong> {props.location}</p>
        <p><strong>Job URL:</strong> {props.postURL}</p>
        <p><strong>Info:</strong> {props.usefulInfo}</p>
        <p><strong>Date Submitted:</strong> {fixedDate}</p>
        <span style={{fontWeight: '700'}}>Submit Application?</span>
        <div>
          <Button 
            btnType='Danger'
            clicked={props.canceled}>Cancel</Button>
          <Button 
            btnType='Success'
            clicked={props.submitted}>Submit</Button>
        </div>
      </div>
  )
  if (props.loading) {
    summary = <Loader />
  }

  return (
    <div>
      {summary}
    </div>
    
  );
};

export default appSummary;