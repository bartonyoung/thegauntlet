import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dash from './Dash.jsx';

<<<<<<< 9f9964d8ca460731036a50391834e8a5904ab968
const dummyData = ['Barton', 'Edmund', 'Taegyu', 'Brendan'];
=======
const dummyData = [
  {
    username: 'Edmund Louie',
    ranking: 'Bronze 5',
  },
  {
    username: 'Barton Young',
    ranking: 'Silver 4',
  },
  {
    username: 'Taegyu Leem',
    ranking: 'Wood 8',
  },
  {
    username: 'Brendan Mok',
    ranking: 'Plastic 10',
  },
];
>>>>>>> test

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
<<<<<<< 9f9964d8ca460731036a50391834e8a5904ab968
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
=======
      users: dummyData,
    };
>>>>>>> test
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
<<<<<<< 9f9964d8ca460731036a50391834e8a5904ab968
        <Route path='/dash' component={() => (
          <Dash handleSubmitChallenge={this.handleSubmitChallenge} users={this.state.users}/>
        )} />
=======
        <Route
path="/dash" component={() => (
          <Dash userInfo={this.state.users} />
        )}
        />
>>>>>>> test
      </Router>
    );
  }
}

export default App;
