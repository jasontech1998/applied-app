import React from 'react';
import classes from './NavItems.module.css';
import NavItem from '../NavItem/NavItem';

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem link="/"><i className="fas fa-home"></i> Home</NavItem>
    {props.token ? <NavItem link="/apps">Applications</NavItem> : null}
    {props.token 
      ? <NavItem link="/logout"><i className="fas fa-user"></i> Log Out</NavItem>
      : null
    }
  </ul>
);

export default navItems;