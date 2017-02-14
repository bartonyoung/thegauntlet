import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("inside comments component", this.props.comments);
    let mappedComments = this.props.comments.map((comment, i) => {
      console.log('comment', typeof comment.id)
      console.log(typeof window.sessionStorage.id)
      if (comment.id === parseInt(window.sessionStorage.id)) {
        console.log('in here')
        return (
          <div>
            {comment.username + ': ' + comment.comment}
          </div>
        );
      }
    });

    return <div>{mappedComments}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Comments);