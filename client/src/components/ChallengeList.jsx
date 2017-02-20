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

    this.onChallengeClick = this.onChallengeClick.bind(this);
    this.upVoteClick = this.upVoteClick.bind(this);
    this.followTheLeader = this.followTheLeader.bind(this);
    this.unFollow = this.unFollow.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  onChallengeClick(challenge) {
    let outer = this;
    if (typeof challenge === 'object') {
      window.sessionStorage.setItem('title', challenge.title);
      window.sessionStorage.setItem('id', challenge.id);
      window.sessionStorage.setItem('description', challenge.description);
      window.sessionStorage.setItem('category', challenge.category);
      window.sessionStorage.setItem('filename', challenge.filename);
      window.sessionStorage.setItem('upvotes', challenge.upvotes);
      window.sessionStorage.setItem('views', challenge.views);
      window.sessionStorage.setItem('username', challenge.username);
      window.sessionStorage.removeItem('respTitle');
      window.sessionStorage.removeItem('respId');
      window.sessionStorage.removeItem('respDescription');
      window.sessionStorage.removeItem('respCategory');
      window.sessionStorage.removeItem('respFilename');
      window.sessionStorage.removeItem('respUpvotes');
      window.sessionStorage.removeItem('respViews');
      window.sessionStorage.removeItem('respUsername');
      $.get('/api/profile/' + window.sessionStorage.username).done(user => {
        outer.props.dispatch(actions.addUser(user));
      });
    } else {
      window.sessionStorage.setItem('username', challenge);
      $.get('/api/profile/' + challenge).done(user => {
        outer.props.dispatch(actions.addUser(user));
      });
    }
  }

  upVoteClick(id) {
    const outer = this;
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: id
    }).then(()=> {
      $.get('/api/allChallenges/')
        .then((data)=> {
          if (outer.props.currentCategory === 'all') {
            data = data.reverse();
          } else if (outer.props.currentCategory === 'recent') {
            data.length < 6 ? data = data.reverse() : data = data.slice(-5).reverse();
          } else if (outer.props.currentCategory === 'popular') {
            data = data.sort((a, b) =>
            b.upvotes - a.upvotes
          );
          } else {
            data = data.filter(challenge =>
            challenge.category === outer.props.currentCategory
          );
          }
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

    let whichFollowButton = (leaderId) => {
      if (this.props.leaders.includes(leaderId)) {
        return (
          <button className="btn btn-default btn-sm pull-right follower"onClick={() => this.unFollow(leaderId)}>
            <span className="glyphicon glyphicon-ok"></span>{'  Unfollow'}
          </button>
        );
      } else {
        return (
          <button className="btn btn-default btn-sm pull-right follower" onClick={() => this.followTheLeader(leaderId)}>
            <span className="glyphicon glyphicon-ok"></span>{'  Follow'}
          </button>
        );
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

<<<<<<< HEAD
=======
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

>>>>>>> Fix bug for timestamp
    let mappedChallenges = this.props.challenges.map((challenge, i) => {
      if (!challenge.parent_id) {
        return (
          <div className="col col-md-6" key={i}>
          <div>
            <h4 onClick={() => this.onChallengeClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
            </div>
            {checkFile(challenge.filename.split('.').pop(), challenge)}<br/>
            <div>
              <Link onClick={() => this.onChallengeClick(challenge)} to={`/profile/${challenge.username}`}>{challenge.username}</Link>
              {whichFollowButton(challenge.user_id)}
              {whichFavoriteIcon(challenge.id)}
              <button onClick={()=>{ this.upVoteClick(challenge.id); }} type="button" className="btn btn-default btn-sm pull-right">
                <span className="glyphicon glyphicon-arrow-up"></span>{` Upvote  ${challenge.upvotes}`}
              </button>
            </div>
          </div>
        );
      }
    });

    if (this.props.currentCategory === 'profile') {
      return <div>
                <ProfileContent/>
            </div>;
    }

    if (this.props.currentCategory === 'LeaderBoard') {
      return <div className="col-md-12">
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
                      return <tr className="success" key={index}>
                               <td> #{index + 1}</td>
                               <td><Link onClick={() => this.onChallengeClick(rank.username)} to={`/profile/${rank.username}`}>{rank.username}</Link></td>
                               <td>{rank.upvotes}</td>
                             </tr>;
                    }
                  })}
                </tbody>
              </table>
            </div>;
    } else if (!mappedChallenges.length) {
      return (
        <div>
          <h3>Sorry, currently there are no challenges in this category...</h3>
        </div>
      );
    } else {
      return <div className="media">{mappedChallenges}</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeList);

