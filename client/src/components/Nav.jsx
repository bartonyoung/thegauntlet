import React from 'react';
import $ from 'jquery';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNav() {
    if (this.props.auth) {
      return (
          <nav className="nav navbar navbar-fixed">
            <div className="container-fluid">
              <button className="btn btn-large btn-default" onClick={this.props.handleLogout}>Log out</button>
              <button className="btn btn-large btn-default" onClick={this.props.editProfile}>Edit profile</button>
              <a className="btn btn-large btn-default" href="/#/dash">Dashboard</a>
              <h5 className="navbar-text navbar-right">You are logged in as <a href="" className="navbar-link">{window.sessionStorage.getItem('key')}</a></h5>
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
