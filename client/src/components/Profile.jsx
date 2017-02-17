import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import ProfileContent from './ProfileContent.jsx';

class Profile extends React.Component {

  componentDidMount() {
    let outer = this;
    $.get('/api/allChallenges').done(data => {
      outer.props.dispatch(actions.addChallenge(data));
    });
    $.get('/api/response', {
      parent_id: window.sessionStorage.getItem('id')
    }).done(data => {
      let responseArr = [];
      data.forEach(response => {
        if (response.parent_id) {
          responseArr.push(response);
        }
      });
      outer.props.dispatch(actions.addResponse(responseArr));
    });
    $.get('/api/profile/' + window.sessionStorage.username).done(data => {
      outer.props.dispatch(actions.addUser(data));
    });
  }

  numFollowers () {
    if (this.props.user) {
      return this.props.user.map((userInfo, i) => {
        return <span key={i}>{userInfo.followers}</span>;
      });
    }
  }

  followTheLeader(leaderId) {
    const outer = this;
    $.post('/api/follower', {
      leader_id: leaderId
    }).then(() => {
      $.get('/api/getLeaders').then(leaders => {
        outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
      });
    });
  }

  unFollow (leaderId) {
    const outer = this;
    $.post('/api/unFollow', {
      leader_id: leaderId
    }).then(() => {
      $.get('/api/getLeaders').then(leaders => {
        outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
      });
    });
  }


  render() {
    if (this.props.user) {
      return (
        <ProfileContent />
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