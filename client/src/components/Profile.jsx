import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import ProfileContent from './ProfileContent.jsx';
import NavBar from './Nav.jsx';

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

  render() {
    if (this.props.user) {
      return (
        <div className='container-fluid'>
          <NavBar />
          <ProfileContent />
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