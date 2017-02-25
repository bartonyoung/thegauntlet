import React from 'react';
import { Link } from 'react-router';
import css from '../styles/commentComponent.css';
import actions from '../../redux/actions';
import { connect } from 'react-redux';

class CommentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onUsernameClick = this.onUsernameClick.bind(this);
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

  render() {
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
          <p className="username"><Link onClick={() => this.onUsernameClick(this.props.comment)}className="userLink">{this.props.comment.username + ' '}</Link></p><span className='timestamp'>{calculateTime(timeDifferenceInSeconds)}</span><br/>{tag(this.props.comment.comment)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(CommentComponent);