import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Home from './components/Home.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Router history={hashHistory}>
          <Route path="/login" component={Home} />
        </Router>
    );
  }
}

render(<App />, document.getElementById('app'));