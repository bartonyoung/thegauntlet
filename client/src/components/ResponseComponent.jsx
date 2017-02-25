import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import $ from 'jquery';
import css from '../styles/response.css';
import { Link } from 'react-router';

class ResponseComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onUsernameClick = this.onUsernameClick.bind(this);

    this.state = {
      isEditing: false
    };
  }

  upVoteClick(id) {
    const outer = this;
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: id
    }).then(() => {
      $.get('/api/response', {parent_id: window.sessionStorage.getItem('id')})
        .then((data)=> {
          data = data.reverse();
          outer.props.dispatch(actions.getResponses(data));
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

  onUsernameClick(response) {
    let outer = this;
    window.sessionStorage.newUsername = response.username;
    window.sessionStorage.newUser_id = response.user_id;
    $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.location.href = '/#/profile/' + response.username;
    });
  }

  saveChallenge(response) {
    let outer = this;
    this.setState({
      isEditing: !this.state.isEditing
    });

    $.ajax({
      url: '/api/challenge/' + response.id,
      type: 'PUT',
      data: {
        title: this.refs.title.value,
        description: this.refs.description.value
      },
      success: function(data) {
        console.log('put request', data);
        outer.props.dispatch(actions.updatePost(data));
      }
    });
  }

  deleteResponse(response) {
    let outer = this;

    $.ajax({
      url: '/api/response/' + response.id,
      type: 'DELETE',
      data: {
        parent_id: window.sessionStorage.getItem('id')
      },
      success: function(data) {
        outer.props.dispatch(actions.getResponses(data));
      }
    });
  }

  editResponse() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  cancelEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    let taskButtons = (response) => {
      if (window.sessionStorage.username === this.props.response.username) {
        if (!this.state.isEditing) {
          return (
            <div>
              <button className="btn btn-default btn-sm edit" onClick={() => this.editResponse()}>
                <span className="glyphicon glyphicon-edit"></span>  
              </button>
              <button className="btn btn-default btn-sm delete" onClick={() => this.deleteResponse(response)}>
                <span className="glyphicon glyphicon-remove"></span>  
              </button>
            </div>
          );
        }
    
        return (
          <div>
            <div className="editor">
              <form id="editform" onSubmit={() => this.saveChallenge(response)}>
                <input type="text" placeholder="Edit title" required ref="title"/><br/>
                <input type="text" placeholder="Edit description" required ref="description"/>
              </form>

              <button type="submit" form="editform" value="submit" className="btn btn-large btn-default edit">Save</button>
              <button className="btn btn-large btn-default delete" onClick={() => this.cancelEdit()}>Cancel</button>
            </div>
          </div>
        );
      }
    };

    let checkFile = (type, responseFilename) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!',
        'mov': 'ANOTHER FORMAT'
      };
      if (fileType[type]) {
        return (<video className="response" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + responseFilename} type="video/mp4"/>*/}
        </video>);
      } else {
        return <img className="response" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />;

        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + responseFilename} width="320" height="240" />;
      }
    };

    let whichButton = (leaderId) => {
      if (this.props.leaders.includes(leaderId)) {
        return (
          <button className="btn btn-default btn-sm" style={{color: 'red'}}onClick={() => this.unFollow(leaderId)}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
      } else {
        return (
          <button className="btn btn-default btn-sm" onClick={() => this.followTheLeader(leaderId)}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
      }
    };

    let whichFavoriteIcon = (challengeId) => {
      if (this.props.favorites.includes(challengeId)) {
        return (
          <button className="btn  btn-default btn-sm">
            <span className="glyphicon glyphicon-heart" style={{color: 'red'}} onClick={() =>{ this.removeFromFavorites(challengeId); }}></span>
          </button>
        );
      } else {
        return (
          <button className="btn btn-default btn-sm" onClick={() => { this.addToFavorites(challengeId); }}>
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

    if (this.props.response) {
      let timeDifferenceInSeconds = (new Date().getTime() - parseInt(this.props.response.created_at)) / 1000;
      return (
        <div className="one-response row">
          <div className="col-lg-4 response-info">
            {checkFile(this.props.response.filename.split('.').pop(), this.props.response.filename)}<br/>
          </div>
          <div className="col-lg-8 response-info">
            <span>{this.props.response.title}</span>
            <span>{this.props.response.description}</span>
            
            <Link onClick={() => this.onUsernameClick(this.props.response)}>{this.props.response.username + ' '}</Link>
            {calculateTime(timeDifferenceInSeconds)}<br/>
            <div className="response-interaction">
              {taskButtons(this.props.response)}
              {whichButton(this.props.response.user_id)}
              {whichFavoriteIcon(this.props.response.id)}
              <button onClick={()=> this.upVoteClick(this.props.response.id) } type="button" className="btn btn-default btn-sm">
                <span className="glyphicon glyphicon-arrow-up"></span>{` ${this.props.response.upvotes}`}
              </button>
            </div>
          </div>  
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ResponseComponent);