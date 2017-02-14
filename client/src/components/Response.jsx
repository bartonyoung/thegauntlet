import React from 'react';
import { connect } from 'react-redux';

class Response extends React.Component {
  constructor(props) {
    super(props);
  }

              // <source src={"https://s3-us-west-1.amazonaws.com/thegauntletbucket420/" + response.filename} type="video/mp4"/>
  render() {
    let checkFile = (type, response) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video width="320" height="240" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket420/' + response.filename} type="video/mp4"/>*/}
        </video>);
      } else {
        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket420/' + response.filename} width="320" height="240" />;
      }
    };
    let mappedResponses = this.props.responses.map((response, i) => {
      console.log(response.filename.split('.').pop());
      if (i !== this.props.responses.length - 1) {
        return (
          <div>
            <h4>{'Response title: ' + response.title}</h4>
            {checkFile(response.filename.split('.').pop(), response)}
            <h6>{'Description: ' + response.description}</h6>
          </div>
        );
      }
    });
    return <div>{mappedResponses}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Response);