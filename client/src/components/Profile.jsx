import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Profile extends React.Component {

  componentDidMount() {
    let outer = this;
    $.get('/api/allChallenges')
    .done(data => {
      data.forEach(function(challenge) {
        if (challenge.username === outer.props.username) {
          console.log('matched');
          outer.props.dispatch(actions.addChallenge(challenge));
        }
      });
    });
  }

  render() {
    return(
      <div className='profilePicture container'>
        <p className='profilePicture text'>This is a placeholder for the profile picture editor</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Profile);