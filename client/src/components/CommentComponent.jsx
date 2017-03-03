import React from 'react';
import { Link } from 'react-router';
import css from '../styles/commentComponent.css';
import actions from '../../redux/actions';
import { connect } from 'react-redux';

class CommentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onUsernameClick = this.onUsernameClick.bind(this);
    this.state = {
      isEditing: false
    };
  }

  onUsernameClick(comment) {
    let outer = this;
    console.log("comment.user_id", comment)
    window.sessionStorage.newUsername = comment.username;
    window.sessionStorage.newUser_id = comment.scott;
    console.log(window.sessionStorage.newUser_id)
    $.get('/api/profile/' + window.sessionStorage.newUsername).done(user => {
      outer.props.dispatch(actions.addUser(user));
      window.location.href = '/#/profile/' + comment.username;
    });
  }

  saveComment(comment) {
    let outer = this;
    this.setState({
      isEditing: !this.state.isEditing
    });

    $.ajax({
      url: '/api/updateComment/' + comment.id,
      type: 'PUT',
      data: {
        comment: this.refs.comment.value
      },
      success: function(data) {
        outer.props.dispatch(actions.updateComment(data));
      }
    });
  }

  deleteComment(comment) {
    let outer = this;
    console.log(comment)
    $.ajax({
      url: '/api/comment/' + comment.challenge_id,
      type: 'DELETE',
      data: {
        id: comment.id
      },
      success: function(data) {
        outer.props.dispatch(actions.getComments(data));
      }
    });
  }

  editComment() {
    this.setState({
      isEditing: true
    });
  }

  render() {
    let taskButtons = (comment) => {
      if (comment.username === window.sessionStorage.username) {
        if (!this.state.isEditing) {
          return (
            <span>
              <button className="btn btn-sm btn-default task-button">
                <span className="glyphicon glyphicon-edit" onClick={() => this.editComment()}></span>
              </button>
              <button className="btn btn-sm btn-default task-button" onClick={() => this.deleteComment(comment)}>
                <span className="glyphicon glyphicon-remove" onClick={() => this.deleteComment(comment)}></span>
              </button>
            </span>
          );
        }

        return (
          <span>
            <div className="editor">
              <form id="editform" onSubmit={() => this.saveComment(comment)}>
                <input type="text" placeholder="Edit comment" required ref="comment"/>
              </form>
              <button type="submit" form="editform" value="submit" className="btn btn-large btn-default edit">Save</button>
              <button className="btn btn-large btn-default cancel" onClick={() => this.cancelEdit()}>Cancel</button>
            </div>
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

    let timeDifferenceInSeconds = (new Date().getTime() - parseInt(this.props.comment.created_at)) / 1000;

    let tag = (string) => {
      let comment = string.split(' ').map((word, i) => {
        if (word.includes('@')) {
          return <a href={'/#/profile/' + word.slice(1)} key={i}>{word}</a>;
        } else {
          return ' ' + word;
        }
      });
      return comment;
    };

    return (
      <div className="one-comment">
        <div className="comment-data">
          <p className="username"><Link onClick={() => this.onUsernameClick(this.props.comment)}className="userLink">{this.props.comment.username + ' '}</Link></p><span className='timestamp'>{taskButtons(this.props.comment)}{calculateTime(timeDifferenceInSeconds)}</span><br/>{tag(this.props.comment.comment)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CommentComponent);