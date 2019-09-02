import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import JobGrid from './containers/JobGrid/JobGrid';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import JobGridFromDB from './containers/JobGrid/JobGridFromDB';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/" exact component={JobGrid} />
                    <Redirect to="/" />
                  </Switch>;
    
    if (this.props.isAuthenticated) {
      routes = <Switch>
                  <Route path="/auth" component={Auth} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/favorite" component={() => <JobGridFromDB type="favorite" />} />
                  <Route path="/history" component={() => <JobGridFromDB type="history" />} />
                  <Route path="/" exact component={JobGrid} />
                  <Redirect to="/" />
                </Switch>;
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
