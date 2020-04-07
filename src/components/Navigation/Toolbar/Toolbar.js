import React from 'react';
import classes from './Toolbar.module.css';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div onClick={props.clicked}><i className="fas fa-bars fa-2x"></i></div>
    <nav className={classes.DesktopOnly}>
      <NavItems token={props.token}/>
    </nav>
  </header>
);

export default toolbar;