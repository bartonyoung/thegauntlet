import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import ChallengeComponent from './ChallengeComponent.jsx';
import ProfileContent from './ProfileContent.jsx';
import $ from 'jquery';
import { Link } from 'react-router';
import css from '../styles/challengeList.css';

class ChallengeList extends React.Component {
  constructor(props) {
    super(props);

    this.onUsernameClick = this.onUsernameClick.bind(this);
    this.upVoteClick = this.upVoteClick.bind(this);
    this.followTheLeader = this.followTheLeader.bind(this);
    this.unFollow = this.unFollow.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  onUsernameClick(challenge) {
    console.log('rank click', challenge)
    let outer = this;
    window.sessionStorage.newUsername = challenge.username;
    window.sessionStorage.newUser_id = challenge.user_id || window.sessionStorage.user_id;
    $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.location.href = '/#/profile/' + challenge.username;
    });
  }

  onChallengeTitleClick(challenge) {
    window.sessionStorage.setItem('challengeId', challenge.id);
  }

  upVoteClick(challenge) {
    const outer = this;
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: challenge.id
    })
    .then(() => {
      $.get('/api/allChallenges/')
      .then((data)=> {
        if (outer.props.currentCategory === 'all') {
          data = data.reverse();
        } else if (outer.props.currentCategory === 'recent') {
          data.length < 6 ? data = data.reverse() : data = data.slice(-5).reverse();
        } else if (outer.props.currentCategory === 'popular') {
          data = data.sort((a, b) => b.upvotes - a.upvotes);
        } else {
          data = data.filter(challenge => challenge.category === outer.props.currentCategory);
        }
        outer.props.dispatch(actions.getChallenges(data));
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

  unFollow(leaderId) {
    const outer = this;
    $.post('/api/unFollow', {
      leader_id: leaderId
    }).then(() => {
      $.get('/api/getLeaders').then(leaders => {
        outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
      });
    });
  }

  addToFavorites(challengeId) {
    const outer = this;
    $.post('/api/favorite', {
      challenge_id: challengeId
    }).then(() => {
      $.get('/api/favorite').then( favorites => {
        outer.props.dispatch(actions.setFavorites(favorites));
      });
    });
  }

  removeFromFavorites(challengeId) {
    console.log('Client remove', challengeId);
    const outer = this;
    $.post('/api/unFavorite', {
      challenge_id: challengeId
    }).then(() => {
      $.get('/api/favorite').then(favorites => {
        outer.props.dispatch(actions.setFavorites(favorites));
      });
    });
  }

  render() {
    let checkFile = (type, challenge) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!',
        'mov': 'ANOTHER VIDEO FORMAT'
      };
      if (fileType[type]) {
        return (
          <div>
            <video controls className="center-block">
            {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} type="video/mp4"/>*/}
            </video>
          </div>
        );
      } else {
            // <img clasName="center-block" src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} />
        return (
          <div>
            <img className="response" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />
          </div>
        );
      }
    };

    let whichFollowButton = (leaderId, user) => {
      if (window.sessionStorage.getItem('key') !== user) {
        if (this.props.leaders.includes(leaderId)) {
          return (
            <button className="btn btn-default btn-sm pull-right follower"onClick={() => this.unFollow(leaderId, user)}>
              <span className="glyphicon glyphicon-ok"></span>{'  Unfollow'}
            </button>
          );
        } else {
          return (
            <button className="btn btn-default btn-sm pull-right follower" onClick={() => this.followTheLeader(leaderId, user)}>
              <span className="glyphicon glyphicon-ok"></span>{'  Follow'}
            </button>
          );
        }
      }
    };

    let whichFavoriteIcon = (challengeId) => {
      if (this.props.favorites.includes(challengeId)) {
        return (
          <button className="btn btn-default btn-sm pull-right">
            <span className="glyphicon glyphicon-heart" style={{color: 'red'}} onClick={() => { this.removeFromFavorites(challengeId); }}></span>
          </button>
        );
      } else {
        return (
          <button className="btn btn-default btn-sm pull-right" onClick={() => { this.addToFavorites(challengeId); }}>
            <span className="glyphicon glyphicon-heart"></span>
          </button>
        );
      }
    };

    let calculateTime = (seconds) => {
      if (seconds < 60) {
        return Math.floor(seconds) + ' seconds ago';
      } else if (seconds >= 60 && seconds < 3600) {
        if (seconds < 120) {
          return ' 1 minute ago';
        } else {
          return Math.floor(seconds / 60) + ' minutes ago';
        }
      } else if (seconds >= 3600 && seconds < 86400) {
        if (seconds < 7200) {
          return ' 1 hour ago';
        } else {
          return Math.floor(seconds / 3600) + ' hours ago';
        }
      } else if (seconds >= 86400 && seconds < 604800) {
        if (seconds < 172800) {
          return ' 1 day ago';
        } else {
          return Math.floor(seconds / 86400) + ' days ago';
        }
      } else if (seconds >= 2592000 && seconds < 31104000) {
        if (seconds < 5184000) {
          return ' 1 month ago';
        } else {
          return Math.floor(seconds / 2592000) + ' months ago';
        }
      } else {
        if (seconds < 62208000) {
          return ' 1 year ago';
        } else {
          return Math.floor(seconds / 31104000) + ' years ago';
        }
      }
    };

    let mappedChallenges = this.props.challenges.map((challenge, i) => {
      if (challenge) {
        let timeDifferenceInSeconds = (new Date().getTime() - parseInt(challenge.created_at)) / 1000;
        return (
          <div className="col col-md-6" key={i}>
          <div>
            <h4 onClick={() => this.onChallengeTitleClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
            </div>
            {checkFile(challenge.filename.split('.').pop(), challenge)}<br/>
            <div>
              <Link onClick={() => this.onUsernameClick(challenge)}>{challenge.username + ' '}</Link>
              {calculateTime(timeDifferenceInSeconds)}
              {whichFollowButton(challenge.user_id, challenge.username)}
              {whichFavoriteIcon(challenge.id)}
              <button onClick={() => this.upVoteClick(challenge)} type="button" className="btn btn-default btn-sm pull-right">
                <span className="glyphicon glyphicon-arrow-up"></span>{` Upvote  ${challenge.upvotes}`}
              </button><br/>
            </div>
          </div>
        );
      } else {
        return <div></div>;
      }
    });

    if (this.props.currentCategory === 'profile') {
      return (
        <div>
          <ProfileContent/>
        </div>
      );
    }

    if (this.props.currentCategory === 'LeaderBoard') {
      return (
        <div className="col-md-12">
          <h1 className="text-center">Rank Top 10</h1>
          <table className="table">
            <thead>
              <tr>
                <th>#RANK</th>
                <th>USERNAME</th>
                <th>UPVOTES</th>
              </tr>
            </thead>
            <tbody>
              {this.props.ranks.map((rank, index) => {
                if (index < 10) {
                  return (
                    <tr className="success" key={index}>
                      <td> #{index + 1}</td>
                      <td><Link onClick={() => this.onUsernameClick(rank)}>{rank.username}</Link></td>
                      <td>{rank.upvotes}</td>
                   </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (mappedChallenges) {
      return <div className="media">{mappedChallenges}</div>;
    } else {
      return (
        <div>
          <h3>Sorry, currently there are no challenges in this category...</h3>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeList);

