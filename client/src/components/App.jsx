import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dash from './Dash.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('app props:', this.props);
    this.handleSubmitChallenge = this.handleSubmitChallenge.bind(this);
  }

  handleSubmitChallenge(challenge) {
    let newChallenge = this.state.challenges;
    newChallenge.push(challenge);
    this.setState({
      challenges: newChallenge
    });
  }

  handleLogout() {
    $.get('/api/logout')
    .done(data => {
      console.log(data);
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
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);

