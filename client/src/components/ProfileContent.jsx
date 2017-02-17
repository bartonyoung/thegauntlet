import React from 'react';
import { connect } from 'react-redux';

class ProfileContent extends React.Component {
  constructor(props) {
    super(props);
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

    let mappedResponses = this.props.responses.map(response => {
      if (response.username === this.props.user[0].username) {
        return (
          <div>
            <h4>{response.title}</h4>
            <p>{response.description}</p>
            {checkFile(response.filename.split('.').pop(), response)}
          </div>
        );
      }
    });

    if (window.sessionStorage.getItem('key') === this.props.user[0].username) {
      return (
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
            {mappedResponses}
          </div>
          <div>

          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='profilePicture container'>
            <p className='profilePicture text'>This is a placeholder for the profile picture editor</p>
          </div>
          <div>
            {this.props.user[0].username + '\'s challenges:'}
            {mappedChallenges}
          </div>
          <div>
            {this.props.user[0].username + '\'s responses:'}
            {mappedResponses}
          </div>
          <div>

          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProfileContent);