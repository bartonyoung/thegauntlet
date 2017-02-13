import React from 'react';
import $ from 'jquery';

class Landing extends React.Component {

  render() {
    return (
      <div className="landing">
        <div className="username">
          <h3>Gauntlet</h3>
        </div>
        <div>
          <a href="#/signup">Signup</a>
          <a href="#/login">Login</a>
        </div>
        <hr />

      </div>
    );
  }
}


export default Landing;
