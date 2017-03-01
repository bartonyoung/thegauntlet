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
    this.downVoteClick = this.downVoteClick.bind(this);
    this.followTheLeader = this.followTheLeader.bind(this);
    this.unFollow = this.unFollow.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.handleLeaderBoard = this.handleLeaderBoard.bind(this);
  }

  onUsernameClick(challenge) {
    let outer = this;
    window.sessionStorage.newUsername = challenge.username;
    window.sessionStorage.newUser_id = challenge.user_id || window.sessionStorage.user_id;
    $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.location.href = '/#/profile/' + challenge.username;
    });
  }

  onRankerClick(rank) {
    let outer = this;
    window.sessionStorage.newUsername = rank.username;
    window.sessionStorage.newUser_id = rank.scott || window.sessionStorage.user_id;
    $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.location.href = '/#/profile/' + rank.username;
    });
  }    

  onChallengeTitleClick(challenge) {
    if (challenge.parent_id === null) {
      window.sessionStorage.setItem('challengeId', challenge.id);
      window.sessionStorage.setItem('currentId', challenge.id);
      window.sessionStorage.setItem('challengeName', challenge.title);
    } else if (window.sessionStorage.challengeId === undefined) {
      window.sessionStorage.setItem('challengeId', challenge.parent_id);
      window.sessionStorage.setItem('currentId', challenge.id);
      window.sessionStorage.setItem('challengeName', challenge.title);
    } else {
      window.sessionStorage.challengeId = challenge.parent_id;
      window.sessionStorage.currentId = challenge.id;
      window.sessionStorage.challengeName = challenge.title;
    }
  }

  upVoteClick(id) {
    const outer = this;   
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: id    
    }).then(() => {
      $.get('/api/upvote').then(data => {
        outer.props.dispatch(actions.getUpvoted(data));
      });
      $.get('/api/downvote').then(data => {
        outer.props.dispatch(actions.getDownvoted(data));
      });
      $.get('/api/singleChallenge', {id: id})
        .then(data => { 
          this.setState({currentVideo: data[0]});
        });
    });  
  }

  downVoteClick(id) {
    const outer = this;   
    $.post('/api/downvote', {
      vote: 1,
      challenge_id: id    
    }).then(() => {
      $.get('/api/upvote').then(data => {
        outer.props.dispatch(actions.getUpvoted(data));
      });
      $.get('/api/downvote').then(data => {
        outer.props.dispatch(actions.getDownvoted(data));
      });
      $.get('/api/singleChallenge', {id: id})
        .then(data => { 
          this.setState({currentVideo: data[0]});
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
    const outer = this;
    $.post('/api/unFavorite', {
      challenge_id: challengeId
    }).then(() => {
      $.get('/api/favorite').then(favorites => {
        outer.props.dispatch(actions.setFavorites(favorites));
      });
    });
  }

  handleLeaderBoard() {
    let bgColor;
    return this.props.ranks.filter(user => {
      return user.upvotes > 0;
    }).map((rank, index) => {  
      if (index < 10) {
        if (index % 2 === 0 ) {
          bgColor = 'info';
        } else {
          bgColor = 'warning';
        }
        return (
                <tr className={bgColor} key={index}>
                  <td>
                    <span className="leader-td"> #{index + 1}</span>
                  </td>
                  <td><Link onClick={() => this.onRankerClick(rank)}><span className="leader-td">{rank.username}</span></Link></td>
                  <td><span className="leader-td">{rank.upvotes}</span></td>
                </tr>
        );
      }
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
            <video controls className="center-block challenge-list-media">
            {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} type="video/mp4"/>*/}
            </video>
          </div>
        );
      } else {
            // <img clasName="center-block" src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} />
        return (
          <div>
            <img className="center-block challenge-list-media" src="http://www.jacksonhole.com/blog/wp-content/uploads/whiteford.jpg" />
          </div>
        );
      }
    };

    let whichFollowButton = (leaderId, user) => {
      if (window.sessionStorage.username !== user) {
        if (this.props.leaders.includes(leaderId)) {
          return (
            <button className="btn btn-default btn-lg social-button follower" style={{color: 'orange'}} onClick={() => this.unFollow(leaderId, user)}>
              <span className="glyphicon glyphicon-user"></span>
            </button>
           
          );
        } else {
          return (
            <button className="btn btn-default btn-lg social-button follower" onClick={() => this.followTheLeader(leaderId, user)}>
              <span className="glyphicon glyphicon-user"></span>
            </button>
            // <i href="##"className="fa fa-user fa-2x" aria-hidden="true" onClick={() => this.followTheLeader(leaderId, user)}></i>
          );
        }
      }
    };

    let whichFavoriteIcon = (challengeId) => {
      if (this.props.favorites.some(challenge => challenge.id === challengeId)) {
        return (
          <button className="btn btn-lg social-button">
            <span className="glyphicon glyphicon-heart" style={{color: 'red'}} onClick={() => { this.removeFromFavorites(challengeId); }}></span>
          </button>
        );
      } else {
        return (
          <button className="btn btn-lg social-button" onClick={() => { this.addToFavorites(challengeId); }}>
            <span className="glyphicon glyphicon-heart"></span>
          </button>
        );
      }
    };

    let voteButtons = (challengeId) => {  
      if (this.props.upvoted.includes(challengeId)) {  
        return (   
          <span>
            <button onClick={() => this.upVoteClick(challengeId)} type="button" className="btn btn-lg" style={{color: 'green', background: 'transparent'}}>
              <span className="glyphicon glyphicon-arrow-up"></span>
            </button>
            <button onClick={() => this.downVoteClick(challengeId)} type="button" className="btn btn-lg" style={{background: 'transparent'}}>
              <span className="glyphicon glyphicon-arrow-down"></span>
            </button>
          </span>
        );
      } else if (this.props.downvoted.includes(challengeId)) {
        return (     
          <span>
            <button onClick={() => this.upVoteClick(challengeId)} type="button" className="btn btn-lg social-button" style={{background: 'transparent'}}>
              <span className="glyphicon glyphicon-arrow-up"></span>
            </button>
            <button onClick={() => this.downVoteClick(challengeId)} type="button" className="btn btn-lg social-button" style={{color: 'red', background: 'transparent'}}>
              <span className="glyphicon glyphicon-arrow-down"></span>
            </button>
          </span>
        );        
      } else {
        return (
          <span>
            <button onClick={() => this.upVoteClick(challengeId)} type="button" className="btn btn-lg social-button" style={{background: 'transparent'}}>
              <span className="glyphicon glyphicon-arrow-up"></span>
            </button>
            <button onClick={() => this.downVoteClick(challengeId)} type="button" className="btn btn-lg social-button" style={{background: 'transparent'}}>
              <span className="glyphicon glyphicon-arrow-down"></span>
            </button>
          </span>
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
                // {calculateTime(timeDifferenceInSeconds)}
                // {whichFollowButton(challenge.user_id, challenge.username)}

    // <button onClick={() => this.upVoteClick(challenge)} type="button" className="btn btn-sm ">
    //               <span className="glyphicon glyphicon-arrow-up"></span>{` Upvote  ${challenge.upvotes}`}
    //             </button><br/>
    let mappedChallenges = this.props.challenges.map((challenge, i) => {
      if (challenge) {
        let timeDifferenceInSeconds = (new Date().getTime() - parseInt(challenge.created_at)) / 1000;
        return (
          <div className="col-md-3 text-center one-challenge" key={i}>
              <h4 onClick={() => this.onChallengeTitleClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
              {checkFile(challenge.filename.split('.').pop(), challenge)}<br/>
            
              <Link className="pull-left" onClick={() => this.onUsernameClick(challenge)}>{challenge.username + ' '}</Link>
              {calculateTime(timeDifferenceInSeconds)}
              
            <div className="row challenge-buttons pagination-centered">
              {whichFavoriteIcon(challenge.id)}
              {voteButtons(challenge.id, challenge.upvotes)}
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
          {/*<h1 className="text-center leaderBoard-title"></h1>*/}
          <img id="leader-img" src="https://badgeos.org/wp-content/uploads/edd/2013/11/leaderboard-300x300.png" alt=""/>
          <table className="table">
            <thead>
              <tr>
                <th>#RANK</th>
                <th>USERNAME</th>
                <th>UPVOTES</th>
              </tr>
            </thead>
            <tbody>
              {this.handleLeaderBoard()}
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

