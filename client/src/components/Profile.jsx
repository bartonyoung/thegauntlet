import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Profile extends React.Component {

  componentDidMount() {
    let outer = this;
    $.get('/api/profile').done(data => {
      outer.props.dispatch(actions.addUser(data));
    });
    $.get('/api/allChallenges').done(data => {
      outer.props.dispatch(actions.addChallenge(data));
    });
  }

  render() {
    let checkFile = (type, challenge) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video width="320" height="240" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket420/' + response.filename} type="video/mp4"/>*/}
        </video>);
      } else {
        return <img width="320" height="240" />;
      }
    };

    let mappedChallenges = this.props.challenges.map(challenge => {
      console.log(this.props)
      if (challenge.username === this.props.user[0].username) {
        return (
          <div>
            <h4>{challenge.title}</h4>
            <p>{challenge.description}</p>
            {checkFile(challenge.filename.split('.').pop(), challenge)}
          </div>
        );
      }
    });

    return(
      <div>
        <div className='profilePicture container'>
          <p className='profilePicture text'>This is a placeholder for the profile picture editor</p>
        </div>
        <div>
          Your challenges:
          {mappedChallenges}
        </div>
        <div>
          Your responses:
        </div>
        <div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Profile);