import React from 'react';
import classes from './Header.module.css';
const header = (props) => (
  <div className={classes.Header}>
    <div className='container'>
      <div className="row">
        <div className="col d-flex justify-content-center align-items-end" id="header">
          <h1 className="text-center px-5">Applied</h1>
        </div>
      </div>
      <div className='text-center'>
        <p>A simple app to keep your job applications organized</p>
      </div>
      <hr></hr>
    </div>
  </div>
);

export default header;