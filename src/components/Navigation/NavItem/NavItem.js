import React from 'react';
import classes from './NavItem.module.css';
import {NavLink} from 'react-router-dom';

const navItem = (props) => (
  <li className={classes.NavItem}>
    <NavLink 
      to={props.link}>{props.children}</NavLink>
  </li>
);

export default navItem;