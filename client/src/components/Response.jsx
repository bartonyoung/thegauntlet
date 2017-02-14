import React from 'react';
import { connect } from 'react-redux';

class Response extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let mappedResponses = this.props.responses.map((response, i) => {
      if (i !== this.props.responses.length - 1) {
        return (
          <div>
            <h4>{'Response title: ' + response.title}</h4>
            <video width="320" height="240" controls>
              <source src={"https://s3-us-west-1.amazonaws.com/thegauntletbucket420/" + response.filename} type="video/mp4"/>
            </video>
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