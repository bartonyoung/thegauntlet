import React from 'react';
import { connect } from 'react-redux';
import css from '../styles/comments.css';
import $ from 'jquery';
import actions from '../../redux/actions';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.commentSubmit = this.commentSubmit.bind(this);
  }
  componentDidMount() {
    this.autoscroll();
  }

  componentDidUpdate() {
    this.autoscroll();
  }
  autoscroll () {
    let node = document.getElementById('comments');
    $('#comments').scrollTop(node.scrollHeight);
  }

  commentSubmit(e) {
    e.preventDefault();
    let outer = this;     
    let comments = {
      comment: this.refs.comment.value,
      challenge_id: window.sessionStorage.id
    };
    $.post('/api/comments', comments).then(() => {
      $.get('/api/comments', {
        challenge_id: window.sessionStorage.getItem('id')
      }).then(data => { 
        outer.props.dispatch(actions.addComment(data));
        outer.refs.comment.value = '';
      });
    });
  }

  renderComments() {
    let outer = this;
    $.get('/api/comments', {
      challenge_id: window.sessionStorage.getItem('id')
    }).done(data => {
      outer.newComments = data;
    });
  }

  render() {
    let mappedComments = this.props.comments.map((comment, i) => {
      if (comment.id === parseInt(window.sessionStorage.id)) {
        return (
          <div>
            {comment.username + ': ' + comment.comment}
          </div>
        );
      }
    });

    return (
    <div className='comment-box'>
      <div id="comments">{mappedComments}</div>
      <form onSubmit={this.commentSubmit}>
        <textarea name="comment" required ref="comment" placeholder="Enter comment..."></textarea>
        <input type="submit" className="btn btn-default btn-xs"/>
      </form>  
    </div> 
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Comments);