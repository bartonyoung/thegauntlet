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
    if (this.refs.video.value) {
      $.ajax({
        url: '/api/s3',
        type: 'POST',
        data: fd,
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        success: function(resp) {
          let created_at = new Date().getTime();

          $.ajax({
            url: '/api/challenge',
            type: 'POST',
            data: {
              title: outer.refs.title.value,
              description: outer.refs.description.value,
              category: outer.refs.category.value,
              filename: resp,
              created_at: created_at,
              username: window.sessionStorage.username,
              to: null
            },
            success: function(data) {
              outer.props.dispatch(actions.addChallenge(data));
              outer.refs.title.value = '';
              outer.refs.description.value = '';
              outer.refs.category.value = '';
              outer.refs.video.value = '';
            }
          });
        }
      });
    }
  }

  goToProfilePage() {
    let outer = this;
    window.sessionStorage.newUsername = window.sessionStorage.username;
    window.sessionStorage.newUser_id = window.sessionStorage.user_id;
    $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.location.href = '/#/profile/' + window.sessionStorage.username;
      $.get('/api/favorite', {username: window.sessionStorage.newUsername}).done(data => {
        outer.props.dispatch(actions.setFavorites(data));
      });       
      $.get('/api/userChallenges', {
        user_id: window.sessionStorage.newUser_id
      }).done(challenges => {
        console.log('get user challenges', challenges);
        outer.props.dispatch(actions.getChallenges(challenges.reverse()));
      });     
    });
  }

  handleIconClick(icon) {
    if (icon === 'message') {
      this.props.dispatch(actions.setProfileView('messages'));
    } else if (icon === 'notification') {
      this.props.dispatch(actions.setProfileView('notifications'));
    }

    window.location.href = '/#/profile/' + window.sessionStorage.username;
  }

  renderMessagesNumber() {
    var unReadMessages = this.props.messages.reduce((a, c) => {
      if (c.read === 0) {
        a += 1;
      }

      return a;
    }, 0);

    for (var i = 0; i < this.props.messages.length; i++) {
      var message = this.props.messages[i];
      if (this.props.displayMessages === 'messages-number' && unReadMessages > 0) {
        return <span className={this.props.displayMessages}>{unReadMessages}</span>;
      } else if (unReadMessages === 0) {
        return <span className={'messages-checked'}></span>;
      }
    }

    return <div></div>;
  }

  renderNotificationsNumber() {
    let notifications = this.props.comments.concat(this.props.responses);
    let unReadNotifications = notifications.reduce((a, c) => {
      if (c.read === 0) {
        a += 1;
      }

      return a;
    }, 0);
    console.log(unReadNotifications, 'unReadNotifications number', notifications)
    for (var n = 0; n < notifications.length; n++) {
      var notification = notifications[n];
      if (this.props.displayNotifications === 'notifications-number' && unReadNotifications > 0) {
        return <span className={this.props.displayNotifications}>{unReadNotifications}</span>;
      } else if (unReadNotifications === 0) {
        return <span className={'notifications-checked'}></span>;
      }
    }

    return <div></div>;
  }

  handleNav() {
    if (window.sessionStorage.username) {
      return (
        <nav className="nav navbar navbar-fixed-top">
            <div className="container">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="javascript: void(0)" className="dropdown-toggle navButton" data-toggle="dropdown" role="button" aria-haspopup="true">Add a Challenge</a>
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
            <input id="fileInput" type="file" placeholder="video or image" required ref="video" name="video"/>
          </form>
          <center><li onClick={this.handleSubmit} className="btn btn-default" id="fileSubmit">Submit</li></center>


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
                  <h5 className="navbar-text">You are logged in as <a href="javascript: void(0)" onClick={()=> this.goToProfilePage()} className="navbar-link username-nav">{window.sessionStorage.username}</a></h5>
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