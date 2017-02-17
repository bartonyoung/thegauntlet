import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class ProfileContent extends React.Component {
  constructor(props) {
    super(props);
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

    let whichButton = (leaderId) => {
      if (this.props.leaders.includes(leaderId)) {
        return <button onClick={() => this.unFollow(leaderId)}>Unfollow</button>;
      } else {
        return <button onClick={() => this.followTheLeader(leaderId)}>Follow</button>;
      }
    };

    if (window.sessionStorage.getItem('key') === this.props.user[0].username) {
      return (
        <div width={screen.width}>
          <div className='profilePicture container'>
            <div className='profilePicture text'>This is a placeholder for the profile picture editor</div>
            Followers: {this.numFollowers()} <br />
          </div><br/>
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
         <div width={screen.width}>
          <div className='profilePicture container'>
            <div className='profilePicture text'>This is a placeholder for the profile picture editor</div>
            Followers: {this.numFollowers()} <br />
          </div><br/>
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