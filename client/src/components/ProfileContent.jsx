import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Link } from 'react-router';

class ProfileContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      first: false,
      second: false,
      third: false,
    };
    this.editProfileImage = this.editProfileImage.bind(this);
    this.editFirstName = this.editFirstName.bind(this);
    this.onUsernameClick = this.onUsernameClick.bind(this);
  }

  componentDidMount () {
    const outer = this;
    this.props.dispatch(actions.setProfileView('all'));
    $.get('/api/getLeaders').then(leaders => {
      outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
      outer.followers();
    });
  }

  numFollowers () {
    if (this.props.user) {
      return this.props.user.map((userInfo, i) => {
        return <span key={i}>{userInfo.followers}</span>;
      });
    }
  }

  changeProfileView(view) {
    this.props.dispatch(actions.setProfileView(view));
  }

  followers() {
    const outer = this;
    $.get('/api/listFollowers', {username: this.props.user[0].username}).then(data => {
      outer.props.dispatch(actions.setFollowers(data));
    });
  }

  onNotificationClick(i) {
    if (this.state[i] === 'none' || !this.state[i]) {
      this.setState({
        [i]: 'unset'
      });
    } else {
      this.setState({
        [i]: 'none'
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
        outer.followers();
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
        outer.followers();
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

  editProfileImage (id) {
    let outer = this;
    var fd = new FormData(document.querySelector('#pic'));
    $.ajax({
      url: '/api/s3',
      type: 'POST',
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success: function(resp) {
        $.ajax({
          url: '/api/profile',
          type: 'PUT',
          data: {
            id: id,
            profilepic: resp
          },
          success: function(data) {
            console.log('successfully updated');
            outer.refs.video.value = '';
            outer.setState({
              display: 'none',
            });
            $.get('/api/profile').then(userData => {
              outer.props.dispatch(actions.addUser(userData));
            });
          }
        });
      }
    });
  }

  editFirstName (id) {
    let outer = this;
    $.ajax({
      url: '/api/profile',
      type: 'PUT',
      data: {
        id: id,
        firstname: outer.refs.firstname.value,
      },
      success: function() {
        $.get('/api/profile').then(userData => {
          outer.props.dispatch(actions.addUser(userData));
          outer.refs.firstname.value = '';
          outer.setState({first: !outer.state.first});
        });
      }
    });
  }

  editLastName (id) {
    let outer = this;
    $.ajax({
      url: '/api/profile',
      type: 'PUT',
      data: {
        id: id,
        lastname: outer.refs.lastname.value,
      },
      success: function() {
        $.get('/api/profile').then(userData => {
          outer.props.dispatch(actions.addUser(userData));
          outer.refs.lastname.value = '';
          outer.setState({second: !outer.state.second});
        });
      }
    });
  }

  editEmail (id) {
    let outer = this;
    $.ajax({
      url: '/api/profile',
      type: 'PUT',
      data: {
        id: id,
        email: outer.refs.email.value,
      },
      success: function() {
        $.get('/api/profile').then(userData => {
          outer.props.dispatch(actions.addUser(userData));
          outer.refs.email.value = '';
          outer.setState({third: !outer.state.third});
        });
      }
    });
  }

  onUsernameClick(post) {
    window.sessionStorage.newUsername = post.username;
    window.sessionStorage.newUser_id = post.user_id;
    $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.location.href = '/#/profile/' + post.username;
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
      if (challenge) {
        if (challenge.username === this.props.user[0].username) {
          return (
            <div>
              <h4>{challenge.title}</h4>
              <p>{challenge.description}</p>
              {checkFile(challenge.filename.split('.').pop(), challenge)}
            </div>
          );
        }
      } else {
        return ' No challenges submitted yet';
      }
    });



    let mappedResponses = this.props.responses.map(response => {
      if (response) {
        if (response.username === this.props.user[0].username) {
          return (
            <div>
              <h4>{response.title}</h4>
              <p>{response.description}</p>
              {checkFile(response.filename.split('.').pop(), response)}
            </div>
          );
        }
      } else {
        return ' No responses submitted yet';
      }
    });

    let whichFollowButton = (leaderId, user) => {
      if (window.sessionStorage.getItem('key') !== user) {
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

    let myView = () => {
      if (this.props.profileView === 'all' && window.sessionStorage.username === this.props.user[0].username) {
        return (
          <div>
            <div>
              Your challenges:
              {mappedChallenges}
            </div>
            <div>
              Your responses:
              {mappedResponses}
            </div>
          </div>
        );
      } else if (this.props.profileView === 'all') {
        return (
          <div>
            <div>
              {this.props.user[0].username + '\'s challenges:'}
              {mappedChallenges}
            </div>
            <div>
              {this.props.user[0].username + '\'s responses:'}
              {mappedResponses}
            </div>
          </div>
        );
      } else if (this.props.profileView === 'followers') {
        return (
          <div>
            Followers:
            {this.props.followers.map((follower, i) => {
              return <div key={i}>{i + 1}.{follower.username}</div>;
            })}
          </div>
        );
      } else if (this.props.profileView === 'mailbox') {
        let mappedArray = [];
        let mappedComments;
        let mappedResponses;

        this.props.challenges.forEach((challenge) => {
          if (challenge.username === window.sessionStorage.username) {
            mappedComments = this.props.comments.map((comment, j) => {
              if (comment) {

                let timeDifferenceInSeconds = (new Date().getTime() - parseInt(comment.created_at)) / 1000;
                if (comment.username === challenge.username) {

                  return (
                    <div>
                      <a href='javascript: void(0)' onClick={() => this.onNotificationClick(j)}><h4>{comment.username + ' commented to your challenge: ' + challenge.title}</h4></a>
                      <h6>{calculateTime(timeDifferenceInSeconds)}</h6>
                      <div style={{display: this.state[j] || 'none'}}>
                        <Link onClick={() => this.onUsernameClick(comment)}>{comment.username + ' '}</Link><br/>
                        {comment.comment}
                      </div>
                    </div>
                  );
                }
              } else {
                return <div></div>;
              }
            });
            mappedResponses = this.props.responses.map((response, i) => {
              if (response) {
                let timeDifferenceInSeconds = (new Date().getTime() - parseInt(response.created_at)) / 1000;
                if (response.parent_id === challenge.id) {
                  return (
                    <div>
                      <a href='javascript: void(0)' onClick={() => this.onNotificationClick(i)}><h4>{response.username + ' responded to your challenge: ' + challenge.title}</h4></a>
                      {calculateTime(timeDifferenceInSeconds)}<br/>
                      <div style={{display: this.state[i] || 'none'}}>
                        <h4>{'Response title: ' + response.title}</h4>
                        <h5>{'Description: ' + response.description}</h5>
                        {checkFile(response.filename.split('.').pop(), response.filename)}<br/>
                        <Link onClick={() => this.onUsernameClick(response)}>{response.username + ' '}</Link>
                        {calculateTime(timeDifferenceInSeconds)}<br/>
                        <h5>{`Views : ${response.views}`}</h5>
                        {whichButton(response.user_id)}
                        {whichFavoriteIcon(response.user_id)}
                        <a onClick={()=> this.upVoteClick(response.id)}>{'Upvote'}</a><p>{`${response.upvotes}`}</p>
                      </div>
                    </div>
                  );
                }
              } else {
                return <div></div>;
              }
            });
            mappedArray.push(mappedResponses);
            mappedArray.push(mappedComments);

          }
        });

        return mappedArray.sort();
      }
    };

    let renderMailbox = () => {
      if (window.sessionStorage.username === this.props.user[0].username) {
        return (
          <button onClick={() => this.changeProfileView('mailbox')}>Mailbox</button>
        );
      } else {
        return (
          <div></div>
        );
      }
    };
    let isUserProfile = (placement, user) => {
      if (window.sessionStorage.username === user) {
        return <span>{<a href='javascript: void(0)' onClick={() => this.setState({[placement]: !this.state[placement]})}><span className="glyphicon glyphicon-pencil"></span></a>}</span>;
      } else {
        return <div></div>;
      }
    };

    let isUserImageClickable = (user) => {
      return window.sessionStorage.username === user;
    };

    let Firstname = (name, id, user) => {
      if (!this.state.first) {
        return (
          <div>
            Firstname: {name} {isUserProfile('first', user)}
          </div>
        );
      } else {
        return (
          <div>
            <form>
              <input ref='firstname' type='text' placeholder={name}/> <button onClick={() => this.editFirstName(id)}><span className="glyphicon glyphicon-ok"></span></button> <a href='javascript: void(0)' onClick={() => this.setState({first: !this.state.first})}><span className="glyphicon glyphicon-pencil"></span></a>
            </form>
          </div>
        );
      }
    };

    let Lastname = (name, id, user) => {
      if (!this.state.second) {
        return (
          <div>
            Lastname: {name} {isUserProfile('second', user)}
          </div>
        );
      } else {
        return (
          <div>
            <form>
              <input ref='lastname' type='text' placeholder={name}/> <button onClick={() => this.editLastName(id)}><span className="glyphicon glyphicon-ok"></span></button> <a href='javascript: void(0)' onClick={() => this.setState({second: !this.state.second})}><span className="glyphicon glyphicon-pencil"></span></a>
            </form>
          </div>
        );
      }
    };
    let Email = (email, id, user) => {
      if (!this.state.third) {
        return (
          <div>
            Email: {email} {isUserProfile('third', user)}
          </div>
        );
      } else {
        return (
          <div>
            <form>
              <input ref='email' type='text' placeholder={email}/> <button onClick={() => this.editEmail(id)}><span className="glyphicon glyphicon-ok"></span></button> <a href='javascript: void(0)' onClick={() => this.setState({third: !this.state.third})}><span className="glyphicon glyphicon-pencil"></span></a>
            </form>
          </div>
        );
      }
    };
    let target = this.props.user[0].username;

    return (
      <div width={screen.width}>
        <div className='profilePicture container'>
          <div id='picContainer'>
            {/*<img className='profilePicture text' src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + this.props.user[0].profilepic} />*/}
            <img className='profilePicture text' src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" onClick={() =>{ if (isUserImageClickable(target)) { this.state.display === 'none' ? this.setState({display: 'unset'}) : this.setState({display: 'none'}); } }}/>
            <ul className='editPic' style={{display: this.state.display}}>
              <li><form id='pic'>
                <input type="file" placeholder="image" ref="video" name="video" onChange={()=> { this.editProfileImage(this.props.user[0].scott); }} />
              </form></li>
            </ul>
          </div>
          Username: {target} <br />
          {Firstname(this.props.user[0].firstname, this.props.user[0].scott, target)}
          {Lastname(this.props.user[0].lastname, this.props.user[0].scott, target)}
          {Email(this.props.user[0].email, this.props.user[0].scott, target)}
          Rank# {this.props.ranks.map((rank, index) => {

              return {username: rank.username, rank: index + 1};

          }).filter((user)=>{ if (user.username === target) { return user; } })[0].rank} (
            {this.props.user[0].upvotes}) <br />
          Followers: {this.props.followers.length} {whichButton(this.props.user[0].scott)} <br />
        </div><br/>
        <div>
          <button onClick={() => this.changeProfileView('all')}>Challenges/Responses</button>
          <button onClick={() => this.changeProfileView('followers')}>Followers</button>
          {renderMailbox()}
        </div>
        {myView()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProfileContent);
