import React from 'react';
import $ from 'jquery';
import {Jumbotron, Col, Row, Nav, Button, Grid, NavItem} from 'react-bootstrap';

class Landing extends React.Component {

  render() {
    return (
      <div>
      <Jumbotron> 
        <h1>Welcome to The Gauntlet!</h1>
        <p>The Gauntlet is a place to test yourself against others!</p>
        <p>Add your own challenge and watch others respond, or one-up another challenger</p>
      </Jumbotron>
      </div>
    );
  }
}


export default Landing;
