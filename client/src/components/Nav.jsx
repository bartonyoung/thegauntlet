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
        <nav className="nav navbar navbar-fixed-top">
            <div className="container">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="javascript: void(0)" className="navButton" onClick={this.props.handleLogout}>Logout</a> 
                </li>
                <li>
                  <a href="javascript: void(0)" className="navButton" onClick={() => this.props.editProfile()}>Edit Profile</a>
                </li>
                <li>
                  <a href="/#/dash" className="navButton">Dashboard</a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <h5 className="navbar-text">You are logged in as <a href="#/profile" className="navbar-link">{window.sessionStorage.getItem('key')}</a></h5>
                </li>
              </ul>
            </div>
          </nav>
      );
    } else {
      return (
          <nav className="nav navbar navbar-fixed-top">
            <div className="container">
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <a href="/#/signup" className="navButton" onClick={this.props.handleDisplay}>Signup</a>
                </li>
                <li>
                  <a href="/#/login" className="navButton" onClick={this.props.handleDisplay}>Login</a>
                </li>
                <li>
                  <a href="/#/dash" className="navButton">Dashboard</a>
                </li>
              </ul>
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
//  <nav className="nav navbar navbar-default navbar-fixed-top">
//             <div className="container">
// <ul className="nav navbar-nav navbar-left">
//                 <li>
//                   <a href="javascript: void(0)" className="btn" onClick={this.props.handleDisplay}>Signup</a>
//                 </li>
//                 <li>
//                   <a href="javascript: void(0)" className="btn" onClick={this.props.handleDisplay}>Login</a>
//                 </li>
//                 <li>
//                   <a href="/#/dash">Dashboard</a>
//                 </li>
//               </ul>;
//               <ul className="nav navbar-nav navbar-left">
//                 <li>
//                   <h5 className="navbar-text">You are logged in as <a href="" className="navbar-link">{window.sessionStorage.getItem('key')}</a></h5>
//                 </li>
//               </ul>
//             </div>
//           </nav>