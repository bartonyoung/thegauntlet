import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Landing from './components/Landing.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

render(<App />, document.getElementById('app'));