import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import JobGrid from './containers/JobGrid/JobGrid';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import JobGridFromDB from './containers/JobGrid/JobGridFromDB';
import Profile from './containers/Profile/Profile';
import JobRecommend from './containers/JobGrid/JobRecommend';

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
                  <Route path="/favorite" render={(props) => <JobGridFromDB {...props} key="favorite" type="favorite" />} />
                  <Route path="/history" render={(props) => <JobGridFromDB {...props} key="history" type="history" />} />
                  <Route path="/search" render={(props) => <JobGrid {...props} key={`${props.location.search}`} />} />
                  <Route path="/recommend" render={(props) => <JobRecommend {...props} />} />
                  <Route path="/profile" render={(props) => <Profile {...props} />} />
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
