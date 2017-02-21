import React from 'react';
import $ from 'jquery';
import css from '../styles/nav.css';
import actions from '../../redux/actions.js';
import {connect} from 'react-redux';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let outer = this;
    var fd = new FormData(document.querySelector('#file'));
    console.log(outer.props.dispatch);
    $.ajax({
      url: '/api/s3',
      type: 'POST',
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success: function(resp) {

        $.ajax({
          url: '/api/challenge',
          type: 'POST',
          data: {
            title: outer.refs.title.value,
            description: outer.refs.description.value,
            category: outer.refs.category.value,
            filename: resp
          },
          success: function(data) {
            data = data.reverse();
            outer.props.dispatch(actions.addChallenge(data));
            $.get('/api/allChallenges').done(challenge => {
              challenge = challenge.reverse();
              outer.props.dispatch(actions.addChallenge(challenge));
            });
            outer.refs.title.value = '';
            outer.refs.description.value = '';
            outer.refs.category.value = '';
            outer.refs.video.value = '';
          }
        });
      }
    });
  }

  handleNav() {
    if (window.sessionStorage.getItem('key')) {
      return (
        <nav className="nav navbar navbar-fixed-top">
            <div className="container">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="javascript: void(0)" className="dropdown-toggle navButton" data-toggle="dropdown" role="button" aria-haspopup="true">Add Challenge!<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <form id="challenge" style={{width: '300px', padding: '15px'}}>

            <div className="form-group">
              <li className="nav-label">Name it!</li>
              <input className="form-control" type="text" placeholder="Name your challenge" required ref="title" name="title"/>
            </div>
            <div className="form-group">
              <li className="nav-label">Describe it!</li>
              <input className="form-control" type="text" placeholder="Description" required ref="description" name="description"/>
            </div>
            <div className="form-group" >
              <li className="nav-label">Pick a category!</li>
              <select className="form-control" required ref="category">
                <option>Charity</option>
                <option>Gaming</option>
                <option>Fitness</option>
                <option>Funny</option>
                <option>Music</option>
                <option>Sports</option>
              </select>
            </div>
          </form>
          <form ref="file" id="file">
          <li className="nav-label-file">Upload your video or image...</li>
            <input type="file" placeholder="video or image" required ref="video" name="video"/>
          </form>
          <li onClick={this.handleSubmit} className="btn btn-default pull-right">Submit</li>


                  </ul>
                </li>
                <li>
                  <a href="/#/dash" className="navButton">Dashboard</a>
                </li>
                <li>
                  <a href="javascript: void(0)" className="navButton" onClick={this.props.handleLogout}>Logout</a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <h5 className="navbar-text">You are logged in as <a href="#/profile" className="navbar-link username-nav">{window.sessionStorage.getItem('key')}</a></h5>
                </li>
                <li>
                  <a href="javascript: void(0)" className="navButton" onClick={() => this.props.editProfile()}>Edit Profile</a>
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


const mapStateToProps = (state) => {
  return state;
};


export default connect(mapStateToProps)(NavBar);