import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dash from './Dash.jsx';
import NavBar from './Nav.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';
import ChallengeComponent from './ChallengeComponent.jsx';
import actions from '../../redux/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      auth: window.sessionStorage.getItem('key'),
    };
  }

  handleLogout() {
    $.get('/api/logout')
    .done(data => {
      window.sessionStorage.removeItem('key');
      window.location.href = '#/';
      this.setState({
        auth: window.sessionStorage.getItem('key')
      });
    });
  }
  
  handleAuth(cb) {
    this.setState({
      auth: window.sessionStorage.getItem('key')
    }, cb);
  }
  handleDisply() {
    this.setState({
    });
  }

  render() {
    return (
      <div>
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={() => {
          return <Signup handleAuth={this.handleAuth.bind(this)} />;
        }} />
        
        <Route path="/login" component={() => { 
          return <Login handleAuth={this.handleAuth.bind(this)} auth={this.state.auth} handleLogout={this.handleLogout.bind(this)} />; 
        }} /> 
        
        <Route path='/dash' component={() => {
          if (this.state.auth) {
            return <Dash dispatch={this.props.dispatch} auth={this.state.auth} handleLogout={this.handleLogout.bind(this)} handleDisply={this.handleDisply.bind(this)} />;
          } else {
            return <Landing />;
          }
        }} />
        <Route path='/challenge' component={() =>{
          return <ChallengeComponent handleAuth={this.handleAuth.bind(this)} auth={this.state.auth} handleLogout={this.handleLogout.bind(this)} />;
        }} />
      </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);

