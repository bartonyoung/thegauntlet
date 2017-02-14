import React from 'react';
import { connect } from 'react-redux';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    console.log('comments props', this.props);
  }

  render() {
    console.log("comments", this.props)
    let mappedComments = this.props.comments.forEach((comment, i) => {
      return <div>
        {comment}
      </div>;
    });

    return <div>{mappedComments}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Comments);