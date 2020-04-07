import React from 'react';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <div className={classes.DivForMedia}>
        <Backdrop show={props.open} clicked={props.closed}/>
      </div> 
      <div className={attachedClasses.join(' ')}>
        <nav>
          <NavItems token={props.token}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;