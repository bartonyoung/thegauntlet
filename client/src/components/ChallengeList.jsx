import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import ChallengeComponent from './ChallengeComponent.jsx';
import $ from 'jquery';
import { Link } from 'react-router';

class ChallengeList extends React.Component {
  constructor(props) {
    super(props);
    this.onChallengeClick = this.onChallengeClick.bind(this);
    this.upVoteClick = this.upVoteClick.bind(this);
    this.followTheLeader = this.followTheLeader.bind(this);
    this.unFollow = this.unFollow.bind(this);
  }

  onChallengeClick(challenge) {
    window.sessionStorage.setItem('title', challenge.title);
    console.log("inside challenge click", challenge.id)
    window.sessionStorage.setItem('id', challenge.id);
    window.sessionStorage.setItem('description', challenge.description);
    window.sessionStorage.setItem('category', challenge.category);
    window.sessionStorage.setItem('filename', challenge.filename);
    window.sessionStorage.setItem('upvotes', challenge.upvotes);
    window.sessionStorage.setItem('views', challenge.views);
<<<<<<< HEAD
    $.get('/api/challenge/' + challenge.id);
    return (
      <ChallengeComponent challenge={challenge} />
    );
    window.location.href = '/#/challenge';
=======
>>>>>>> Render correct challenge specific responses and correct challenges
  }

  upVoteClick(id) {
    const outer = this;
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: id
    }).then(()=> {
      $.get('/api/allChallenges/')
        .then((data)=> {
          data = data.reverse();
          outer.props.dispatch(actions.addChallenge(data));
        });
    });
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
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket420/' + challenge.filename} type="video/mp4"/>*/}
        </video>);
      } else {
        return <img width="320" height="240" />;
      }
    };

    let whichButton = (leaderId) => {
      if (this.props.leaders.includes(leaderId)) {
        return <button onClick={() => this.unFollow(leaderId)}>Unfollow</button>;
      } else {
        return <button onClick={() => this.followTheLeader(leaderId)}>Follow</button>;
      }   
    }; 

    let mappedChallenges = this.props.challenges.map((challenge, i) => {
<<<<<<< HEAD
      console.log(challenge);
      return <div onClick={() => this.onChallengeClick(challenge)}>
        <h1><Link to={'/challenge'}>{challenge.title}</Link></h1>
        {checkFile(challenge.filename.split('.').pop(), challenge)}<br/>
        <Link to={`/profile/${challenge.username}`}>{challenge.username}</Link><br/>
        {whichButton(challenge.user_id)}
        {'Upvotes: ' + challenge.upvotes + ' Views: ' + challenge.views}
      </div>;
=======
      if (!challenge.parent_id) {
        console.log('inside mappedChallenges', challenge)
        return <div onClick={() => this.onChallengeClick(challenge)}>
          <h1><Link to={'/challenge'}>{challenge.title}</Link></h1>
          {checkFile(challenge.filename.split('.').pop(), challenge)}<br/>
          <Link to={`/profile/${challenge.username}`}>{challenge.username}</Link><br/>
          {'Upvotes: ' + challenge.upvotes + ' Views: ' + challenge.views}
        </div>;
      }
>>>>>>> Render correct challenge specific responses and correct challenges
    });

    return <div>{mappedChallenges}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeList);
