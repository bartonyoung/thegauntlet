import React from 'react';
import ResponseList from './ResponseList.jsx';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import CommentList from './CommentList.jsx';
import NavBar from './Nav.jsx';
import css from '../styles/nav.css';
import moreCSS from '../styles/challengeComponent.css';
import { Link } from 'react-router';

class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameClick = this.onUsernameClick.bind(this);
    this.sortResponses = this.sortResponses.bind(this);

    this.state = {
      isEditing: false
    };
  }

  componentWillMount() {
    let outer = this;
    $.get('/api/response', {
      parent_id: window.sessionStorage.getItem('id')
    }).done(data => {
      console.log('get response data', data);
      outer.props.dispatch(actions.getResponses(data.reverse()));
    });
    $.get('/api/comments', {
      challenge_id: window.sessionStorage.getItem('id')
    }).done(data => {
      outer.props.dispatch(actions.getComments(data.reverse()));
    });
    $.get('/api/favorite').done(data => {
      outer.props.dispatch(actions.setFavorites(data));
    });
    $.get('/api/challenge/' + window.sessionStorage.id).done(data => {
      outer.props.dispatch(actions.getChallenges(data));
    });
  }

  handleSubmit() {
    let outer = this;
    var fd = new FormData(document.querySelector('#upload'));
    if (this.refs.video.value) {
      $.ajax({
        url: '/api/s3',
        type: 'POST',
        data: fd,
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        success: function(resp) {
          let created_at = new Date().getTime();

          $.ajax({
            url: '/api/response',
            type: 'POST',
            data: {
              title: outer.refs.title.value,
              description: outer.refs.description.value,
              category: '',
              filename: resp,
              parent_id: window.sessionStorage.getItem('id'),
              created_at: created_at 
            },
            success: function(data) {
              outer.props.dispatch(actions.addResponse(data));
              outer.refs.title.value = '';
              outer.refs.description.value = '';
              outer.refs.video.value = '';
            }
          });
        }
      });
    }
  }

  saveChallenge(challenge) {
    let outer = this;
    this.setState({
      isEditing: !this.state.isEditing
    });

    $.ajax({
      url: '/api/challenge/' + challenge.id,
      type: 'PUT',
      data: {
        title: this.refs.title.value,
        description: this.refs.description.value
      },
      success: function(data) {
        outer.props.dispatch(actions.updatePost(data));
      }
    });
  }

  deleteChallenge(challenge) {
    let outer = this;

    $.ajax({
      url: '/api/challenge/' + challenge.id,
      type: 'DELETE',
      success: function(data) {
        outer.props.dispatch(actions.getChallenges(data));
        window.location.href = '/#/dash';
      }
    });
  }

  editChallenge() {
    this.setState({
      isEditing: true
    });
  }

  onUsernameClick(challenge) {
    console.log('challenge userid', challenge.user_id);
    let outer = this;
    $.get('/api/profile/' + challenge.username).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.sessionStorage.username = challenge.username;
      window.location.href = '/#/profile/' + challenge.username;
    });
  }

  cancelEdit() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  sortResponses(sortBy) {
    $.get('/api/response/', {
      parent_id: window.sessionStorage.getItem('id')
    }).then( data => {
      console.log(data);
    });
  }

  render() {
    let taskButtons = (challenge) => {
      if (challenge.username === window.sessionStorage.username) {
        if (!this.state.isEditing) {
          return (
            <div>
              <button className="btn btn-large btn-default edit" onClick={() => this.editChallenge()}>Edit</button>
              <button className="btn btn-large btn-default delete" onClick={() => this.deleteChallenge(challenge)}>Delete</button>
            </div>
          );
        }

        return (
          <div>
            <div className="editor">
              <form id="editform" onSubmit={() => this.saveChallenge(challenge)}>
                <input type="text" placeholder="Edit title" required ref="title"/><br/>
                <input type="text" placeholder="Edit description" required ref="description"/>
              </form>
              <button type="submit" form="editform" value="submit" className="btn btn-large btn-default edit">Save</button>
              <button className="btn btn-large btn-default cancel" onClick={() => this.cancelEdit()}>Cancel</button>
            </div>
          </div>
        );
      }
    };

    let checkFile = (type, challenge) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video className="parentMedia" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} type="video/mp4"/>*/}
        </video>);
      } else {
        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucke  t421/' + challenge.filename} width="320" height="240" />;
        return <img className="parentMedia" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />;
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

    for (var i = 0; i < this.props.challenges.length; i++) {
      if (this.props.challenges[i].id === parseInt(window.sessionStorage.id)) {
        let challenge = this.props.challenges[i];
        let timeDifferenceInSeconds = (new Date().getTime() - challenge.created_at) / 1000;

        return (
        <div className="container-fluid">
        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout} editProfile={this.props.editProfile}/>
          <div className='row mainRow'>
            <div className="col-lg-4 col-lg-offset-1 challengeInfo mainRowColumn">
              {checkFile(challenge.filename.split('.').pop(), challenge)}<br/>
            </div>
            <div className="col-lg-2 challengeInfo mainRowColumn">
              <h3 className='main-challenge-title'>{challenge.title} by <Link onClick={() => this.onUsernameClick(challenge)} className="userLink">{challenge.username}</Link></h3>
              <p className='main-challenge-description'>{challenge.description}</p>
              {calculateTime(timeDifferenceInSeconds)}
              {taskButtons(challenge)}
              <p>{'Upvotes: ' + challenge.upvotes}</p>
            </div>
            <div className="col-lg-4 col-lg-offset-1 mainRowColumn outerBar">
              <div className="col-lg-4 fixed">
                <div className="row text-center">
                  <div className="response-buttons-top">
                    <span className="dropdown">
                      <button href="javascript: void(0)" className="dropdown-toggle response-button" data-toggle="dropdown" role="button" aria-haspopup="true">RESPOND<span className="caret"></span></button>
                      <ul className="dropdown-menu">
                        <form id="challenge" style={{width: '300px', padding: '15px'}}>
                          <div className="form-group">
                            <li className="nav-label">Name it!</li>
                            <input className="form-control" type="text" placeholder="Name your challenge" required ref="title" name="title"/>
                          </div>
                          <div className="form-group">
                            <li className="nav-label">Describe it!</li>
                            <input className="form-control" type="text" placeholder="Description" required ref="description" name="description"/>
                          </div>
                        </form>
                        <form ref="file" id="upload">
                          <li className="nav-label-file">Upload your video or image...</li>
                          <input type="file" placeholder="video or image" required ref="video" name="video"/>
                        </form>
                        <li onClick={this.handleSubmit} className="btn btn-default pull-right">Submit</li>
                      </ul>
                    </span>
                    <button className="button response-button" onClick={() => { this.sortResponses('recent'); }}>RECENT</button>
                    <button className="button response-button" onClick={() => { this.sortResponses('top'); }}>TOP</button>
                  </div>
                </div>
                
                <ResponseList />
                
              </div>
            </div>  
          </div>
          
          <CommentList />

      </div>
        );
      }
    }
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeComponent);

//JUST FOR SAFETY!!