import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dash from './Dash.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';
import ChallengeComponent from './ChallengeComponent.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    $.get('/api/logout')
    .done(data => {
      window.sessionStorage.removeItem('key');
      window.location.href = '#/';
    });
  }


  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/dash' component={() => (
          <Dash handleLogout={this.handleLogout.bind(this)} dispatch={this.props.dispatch} />
        )} />
        <Route path='/challenge' component={ChallengeComponent} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);

