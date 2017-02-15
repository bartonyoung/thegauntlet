import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("inside comments component", this.props.comments);
    let mappedComments = this.props.comments.map((comment, i) => {

      if (comment.id === parseInt(window.sessionStorage.id)) {

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