import React from 'react';
import Response from './Response.jsx';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import $ from 'jquery';

class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    let outer = this;
    $.get('/api/response').done(data => {
      outer.props.dispatch(actions.addResponse(data));
      console.log('data', data);
    })
  }

  render() {

    return (
      <div>
        <h1>{"Challenge Title: " + window.localStorage.title}</h1>
        <h4>{"Description: " + window.localStorage.description}</h4>
        {"Upload your response: "}
        <form id="challenge" encType="multipart/form-data" action="/api/response" method="post">
          <input type="text" placeholder="Name your challenge" required ref="title" name="title"/>
          <input type="text" placeholder="Description" required ref="description" name="description"/>
          <input type="text" placeholder="category" required ref="category" name="category"/>
          <input type="file" placeholder="video" required ref="video" name="video"/>
          <button>Submit</button>
        </form>
        <Response />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(ChallengeComponent);