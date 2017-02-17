import React from 'react';
import $ from 'jquery';
import css from '../styles/nav.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNav() {
    if (this.props.auth) {
      return (
          <nav className="nav navbar navbar-fixed">
            <div className="container-fluid">
              <button className="btn btn-large btn-default navbar-right" onClick={this.props.handleLogout}>Log out</button>
              <button className="btn btn-large btn-default navbar-right" onClick={() => this.props.editProfile()}>Edit profile</button>
              <a className="btn btn-large btn-default navbar-right" href="/#/dash">Dashboard</a>
              <h5 className="navbar-text navbar-left">You are logged in as <a href="" className="navbar-link">{window.sessionStorage.getItem('key')}</a></h5>
            </div>
          </nav>
      );
    } else {
      return (
          <nav className="nav navbar navbar-fixed">
            <div className="container-fluid">
              <a href="/#/signup" className="btn" onClick={this.props.handleDisplay}>Signup</a>
              <a href="/#/login" className="btn" onClick={this.props.handleDisplay}>Login</a>
            </div>
          </nav>
      );
    }
  }
  render() {
    return (
      <div>
       {this.handleNav()}
      </div>
    );
  }
}

export default NavBar;
