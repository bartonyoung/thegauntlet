import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dash from './Dash.jsx';
import ChallengeView from './ChallengeView.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    $.get('/api/logout')
    .done(data => {
      window.sessionStorage.removeItem('key');
    });
  }


  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/dash' component={() => (
          <Dash handleSubmitChallenge={this.handleSubmitChallenge} handleLogout={this.handleLogout.bind(this)} challenges={this.props.challenges} dispatch={this.props.dispatch}/>
        )} />
        <Route path='/challenge' component={ChallengeView} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);

