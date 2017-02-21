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
    };
    this.editProfileImage = this.editProfileImage.bind(this);
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

  onNotificationClick(challenge, response) {
    window.sessionStorage.setItem('title', challenge.title);
    window.sessionStorage.setItem('id', challenge.id);
    window.sessionStorage.setItem('description', challenge.description);
    window.sessionStorage.setItem('category', challenge.category);
    window.sessionStorage.setItem('filename', challenge.filename);
    window.sessionStorage.setItem('upvotes', challenge.upvotes);
    window.sessionStorage.setItem('views', challenge.views);
    window.sessionStorage.setItem('username', challenge.username);
    window.sessionStorage.setItem('respTitle', response.title);
    window.sessionStorage.setItem('respParentID', response.parent_id);
    window.sessionStorage.setItem('respID', response.id);
    window.sessionStorage.setItem('respDescription', response.description);
    window.sessionStorage.setItem('respCategory', response.category);
    window.sessionStorage.setItem('respFilename', response.filename);
    window.sessionStorage.setItem('respUpvotes', response.upvotes);
    window.sessionStorage.setItem('respViews', response.views);
    window.sessionStorage.setItem('respUsername', response.username);
    window.sessionStorage.setItem('respUserId', response.user_id);
    window.sessionStorage.setItem('respId', response.id);
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
      let outer = this;
      if (this.props.leaders.includes(leaderId)) {
        return <button onClick={() => this.unFollow(leaderId)}>Unfollow</button>;
      } else {
        return <button onClick={() => this.followTheLeader(leaderId)}>Follow</button>;
      }
    };

    let myView = () => {
      if (this.props.profileView === 'all' && window.sessionStorage.getItem('key') === this.props.user[0].username) {
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
        let mappedNotifications;
        this.props.challenges.forEach((challenge) => {
          if (challenge.username === window.sessionStorage.username) {
            mappedNotifications = this.props.responses.map((response, i) => {
              let timeDifferenceInSeconds = (new Date().getTime() - parseInt(response.created_at)) / 1000;

              if (response.parent_id === challenge.id) {
                return (
                  <div>
                    <a href='javascript: void(0)' onClick={() => this.onNotificationClick(challenge, response, i)}><h4>{response.username + ' responded to your challenge: ' + challenge.title}</h4></a>
                    {calculateTime(timeDifferenceInSeconds)}<br/>
                    <div className="showresponse" style={{display: this.state[i] || 'none'}}>
                      <h4>{'Response title: ' + response.title}</h4>
                      <h5>{'Description: ' + response.description}</h5>
                      {checkFile(response.filename.split('.').pop(), response.filename)}<br/>
                      <Link onClick={() => this.onUsernameClick(response.username)} to={`/profile/${response.username}`}>{response.username + ' '}</Link>
                      {calculateTime(timeDifferenceInSeconds)}<br/>
                      <h5>{`Views : ${response.views}`}</h5>
                      {whichButton(response.user_id)}
                      {whichFavoriteIcon(response.user_id)}
                      <a onClick={()=> this.upVoteClick(response.id)}>{'Upvote'}</a><p>{`${response.upvotes}`}</p>
                    </div>
                  </div>
                );
              }
            });
            mappedArray.push(mappedNotifications.reverse());
          }
        });

        return mappedArray;
      }
    };

    let renderMailbox = () => {
      if (window.sessionStorage.getItem('key') === this.props.user[0].username) {
        return (
          <button onClick={() => this.changeProfileView('mailbox')}>Mailbox</button>
        );
      } else {
        return (
          <div></div>
        );
      }
    };

    let target = this.props.user[0].username;
    return (
        <div width={screen.width}>
          <div className='profilePicture container'>
            <div id='picContainer'>
              {/*<img className='profilePicture text' src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + this.props.user[0].profilepic} />*/}
              <img className='profilePicture text' src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" onClick={() => this.state.display === 'none' ? this.setState({display: 'unset'}) : this.setState({display: 'none'})}/>
              <ul className='editPic' style={{display: this.state.display}}>
                {/*<li><button id='formButton' onClick={()=> this.editProfileImage(this.props.user[0].id)}>
                  Edit Profile Image
                </button></li>*/}
                <li><form id='pic'>
                  <input type="file" placeholder="image" ref="video" name="video" onChange={()=> this.editProfileImage(this.props.user[0].id)} />
                </form></li>
              </ul>
            </div>
            Username: {this.props.user[0].username} <br />
            Firstname: {this.props.user[0].firstname} <br />
            Lastname: {this.props.user[0].lastname} <br />
            Email: {this.props.user[0].email} <br />
            Rank# {this.props.ranks.map((rank, index)=>{
              return {username: rank.username, rank: index + 1};
            }).filter((user)=>{ if (user.username === target) { return user; } })[0].rank} (
              {this.props.user[0].upvotes}) <br />
            Followers: {this.numFollowers()} <br />
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
