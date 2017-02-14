import React from 'react';
import { connect } from 'react-redux';

class Response extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mappedResponses = this.props.responses.map((response, i) => {
      if (i > 0) {
        return (
          <div>
            <h4>{'Response title: ' + response.title}</h4>
            <h6>{'Description: ' + response.description}</h6>
          </div>
        );
      }
    });
    return <div>{mappedResponses}</div>
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Response);