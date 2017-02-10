import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Landing from './Landing.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Dash from './Dash.jsx';

const dummyData = [
  {
    username: "Edmund Louie",
    ranking: "Bronze 5"
  },
  {
    username: "Barton Young",
    ranking: "Silver 4"
  },
  {
    username: "Taegyu Leem",
    ranking: "Wood 8"
  },
  {
    username: "Brendan Mok",
    ranking: "Plastic 10"
  }
];
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: dummyData
    }
  }

  render() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/dash' component={() => (
          <Dash userInfo={this.state.users} />
        )} />
      </Router>
    );
  }
}

export default App