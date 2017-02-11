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

  submitChallenge(e) {
    console.log("the video:");
    e.preventDefault();
    let newChallenge = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      category: this.refs.category.value
    };
    // $.ajax({
    //   url: '/api/challenge',
    //   type: 'POST',
    //   data: newChallenge,
    //   contentType: false,
    //   processData: false,
    //   success: function(data) {
    //     console.log('successfully posted');
    //   }
    // });
  }

  componentDidMount() {
    $.get('/api/allChallenges').done(data => {
      data.forEach(function(challenge) {
        this.props.dispatch(actions.addChallenge(challenge));
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