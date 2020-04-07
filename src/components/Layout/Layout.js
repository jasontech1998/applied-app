import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosed = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpen = () => {
    this.setState({showSideDrawer: true})
  }
  render () {
    return (
      <Aux>
        <Toolbar 
          clicked={this.sideDrawerOpen}
          token={this.props.hasToken}/>
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosed}
          token={this.props.hasToken} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
} 

const mapStateToProps = state => {
  return {
    hasToken: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);