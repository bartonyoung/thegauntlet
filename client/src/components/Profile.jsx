import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import ProfileContent from './ProfileContent.jsx';
import NavBar from './Nav.jsx';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let outer = this;
    if (window.sessionStorage.username === window.sessionStorage.newUsername) {
      $.get('/api/response', {
        parent_id: window.sessionStorage.newUser_id
      }).done(data => {
        let responseArr = [];
        data.forEach(response => {
          if (response.parent_id) {
            responseArr.push(response);
          }
        });
        outer.props.dispatch(actions.getResponses(responseArr));
      });
      $.get('/api/comments', {
        user_id: window.sessionStorage.newUser_id
      }).done(data => {
        outer.props.dispatch(actions.getComments(data.reverse()));
      });
    }
    if (this.props.profileView !== 'messages') {
      $.get('/api/messages/' + window.sessionStorage.user_id).done(messages => {

        outer.props.dispatch(actions.getMessages(messages));
      });
    }
    $.get('/api/ranks').done((rankData)=>{
      outer.props.dispatch(actions.getRanks(rankData));
    });
    $.get('/api/userChallenges', {
      user_id: window.sessionStorage.newUser_id
    }).done(challenges => {
      outer.props.dispatch(actions.getChallenges(challenges.reverse()));
    });
    if (!outer.props.user) {
      $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
        outer.props.dispatch(actions.addUser(user));
      });
    }
    if (outer.props.favorites.length === 0) {
      $.get('/api/favorite', {username: window.sessionStorage.newUsername}).done(data => {
        outer.props.dispatch(actions.setFavorites(data));
      });
    }
  }

  render() {
    if (this.props.user) {
      return (
        <div className='container-fluid profile'>
          <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout}/>
          <ProfileContent handleChange={this.handleChange}/>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Profile);