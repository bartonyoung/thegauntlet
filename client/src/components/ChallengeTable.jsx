import React from 'react';
import Challenge from './Challenge.jsx';
import path from 'path';
import actions from '../../redux/actions.js';
import $ from 'jquery';

class ChallengeTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    console.log('actions', actions)
  }

  componentDidMount() {
    let outer = this;
    $.get('/api/allChallenges').done(data => {
      data.forEach(function(challenge) {
        outer.props.dispatch(actions.addChallenge(challenge));
      });
    });
  }

  render() {
    return (
      <div>
        <form encType="multipart/form-data" action="/api/challenge" method="post">
          <input type="text" placeholder="Name your challenge" required ref="title" name="title"/>
          <input type="text" placeholder="Description" required ref="description" name="description"/>
          <input type="text" placeholder="category" required ref="category" name="category"/>
          <input type="file" placeholder="video" required ref="video" name="video"/>
          <button>Submit</button>
        </form>
        <Challenge challenges={this.props.challenges} />
      </div>
    );
  }
}

export default ChallengeTable;