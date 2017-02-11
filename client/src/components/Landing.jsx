import React from 'react';
import $ from 'jquery';
import {Jumbotron, Col, Row, Nav, Button, Grid, NavItem} from 'react-bootstrap';

class Landing extends React.Component {

  render() {
    return (
      <div>
      <link rel="stylesheet" href="../styles/landing.css"></link>
      <Nav bsStyle="pills">
        <NavItem href='#/signup' className="pull-right">SignUp</NavItem>
        <NavItem href='#/login' className="pull-right">Login</NavItem>
      </Nav>
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
