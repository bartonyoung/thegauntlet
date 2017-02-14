import React from 'react';
import $ from 'jquery';
import {Jumbotron, Col, Row, Button, Grid, Nav, NavItem} from 'react-bootstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNav() {
    if (this.props.auth) {
      if (window.location.hash !== '#/dash') {
        return <Nav bsStyle="pills">
                  <h4>Show World what you got {window.sessionStorage.getItem('key')}!</h4>
                  <button onClick={this.props.handleLogout}>Log out</button>
                </Nav>;
      } else {
        return <Nav bsStyle="pills">
                  <h4>HI! {window.sessionStorage.getItem('key')}</h4>  
                  <button onClick={this.props.handleLogout}>Log out</button>
                </Nav>;
      } 
    } else {
      return <Nav bsStyle="pills">
               <a href="/#/signup"><button>Signup</button></a>
               <a href="/#/login"><button>Login</button></a>
             </Nav>;
    }
  }
  render() {
    return (
      <div className="">
       {this.handleNav()}
      </div>
    );
  }
}

export default NavBar;
