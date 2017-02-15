import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import $ from 'jquery';

class Response extends React.Component {
  constructor(props) {
    super(props);
    this.upVoteClick = this.upVoteClick.bind(this);
  }

  upVoteClick(id) { 
    const outer = this;
    $.post('/api/upvote', { 
      vote: 1,
      challenge_id: id
    }).then(()=> {   
      $.get('/api/response', {parent_id: window.sessionStorage.getItem('id')})
        .then((data)=> {
          data = data.reverse();
          outer.props.dispatch(actions.addResponse(data));
        });
    });
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
            <p>{'Description: ' + response.description}</p>
            {checkFile(response.filename.split('.').pop(), response)}
            <p>{`Views : ${response.views}`}</p>
            <a onClick={()=> this.upVoteClick(response.id)}>{'Upvote'}</a><p>{`${response.upvotes}`}</p>
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