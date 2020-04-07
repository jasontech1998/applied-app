import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import AppBuilder from './containers/AppBuilder/AppBuilder';
import Logout from './containers/Logout/Logout';
import Applications from './components/Applications/Applications';
import Auth from './containers/Auth/Auth';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from './store/actions/actionTypes';
import Confirmation from './components/Confirmation/Confirmation';

class App extends Component {
  componentDidMount () {
    this.props.onAutoSignUp();
  }
  render () {
    return (
      <div className="App">
        <Layout>
          <Header />
          <Switch>
            <Route path="/" exact component={AppBuilder} />
            <Route path="/apps" component={Applications} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Route render={() => <h2 className='text-center display-1' style={{color: 'red'}}>404 Not Found</h2>}/>
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
