import React from 'react';
import $ from 'jquery';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNav() {
    if (this.props.auth) {
      if (window.location.hash !== '#/dash') {
        return ( 
          <nav className="nav navbar navbar-fixed">
            <div className="container-fluid">
              <button onClick={this.props.handleLogout}>Log out</button>
              <button onClick={this.props.editProfile}>Edit profile</button>
              <h5 className="navbar-text navbar-right">You are logged in as <a href="" classNavbar="navbar-link">{window.sessionStorage.getItem('key')}</a></h5>
            </div>  
          </nav>
        );
      } else {
        return (
          <nav className="nav navbar navbar-fixed">
            <div className="container-fluid">
              <button onClick={this.props.handleLogout}>Log out</button>
              <button onClick={this.props.editProfile}>Edit profile</button>
              <h5 className="navbar-text navbar-right">You are logged in as <a href="" className="navbar-link">{window.sessionStorage.getItem('key')}</a></h5>
            </div>
          </nav>
        );       
      }
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
