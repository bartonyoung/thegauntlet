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
         <nav className="nav navbar navbar-fixed">
            <div className="container-fluid">
              
            <a href="/#/signup" className="btn" onClick={this.props.handleDisplay}>Signup</a>
            <a href="/#/login" className="btn" onClick={this.props.handleDisplay}>Login</a>
            </div>
          </nav>
      <div className="jumbotron text-center">
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
