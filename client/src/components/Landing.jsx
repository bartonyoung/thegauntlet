import React from 'react';
import $ from 'jquery';
import {connect} from 'react-redux';

class Landing extends React.Component {

  constructor(props) { 
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <a href="/#/signup"><button onClick={this.props.handleDisplay}>Signup</button></a>
          <a href="/#/login"><button onClick={this.props.handleDisplay}>Login</button></a>
        </div> 
      <div className="jumbotron">
        <h1>Welcome to The Gauntlet!</h1>
        <p>The Gauntlet is a place to test yourself against others!</p>
        <p>Add your own challenge and watch others respond, or one-up another challenger</p>
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Landing);
