import React from 'react';
import { connect } from 'react-redux';
import css from '../styles/comments.css';
import $ from 'jquery';

class Comments extends React.Component {
  constructor(props) {
    super(props);
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

    return <div id="comments" style={{width: screen.width * 0.3, height: screen.height * 0.4}}>{mappedComments}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Comments);