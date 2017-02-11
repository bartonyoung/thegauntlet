import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dash from './Dash.jsx';

const dummyData = ['Barton', 'Edmund', 'Taegyu', 'Brendan'];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.handleSubmitChallenge = this.handleSubmitChallenge.bind(this);
  }

  handleSubmitChallenge(challenge) {
    let newChallenge = this.state.users;
    console.log('newChallenge:', newChallenge);
    newChallenge.push(challenge);
    this.setState({
      users: newChallenge
    });
  }

  render() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/dash' component={() => (
          <Dash handleSubmitChallenge={this.handleSubmitChallenge} users={this.state.users}/>
        )} />
      </Router>
    );
  }
}

export default App