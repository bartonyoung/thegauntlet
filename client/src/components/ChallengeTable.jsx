import React from 'react';
import Challenge from './Challenge.jsx';
import path from 'path';
import actions from '../../redux/actions.js';

class ChallengeTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    console.log('actions', actions)
  }

  submitChallenge(e) {
    console.log(this.props)
    e.preventDefault();
    console.log(this.refs.title.value);
    let newChallenge = {
      title: this.refs.title.value,
      description: this.refs.description.value,
      category: this.refs.category.value
    }


    this.props.dispatch(actions.addChallenge(newChallenge));
    // this.props.handleSubmitChallenge(this.refs.challengeName.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitChallenge.bind(this)}>
          <input type="text" placeholder="Name your challenge" required ref="title"/>
          <input type="text" placeholder="Description" required ref="description"/>
          <input type="text" placeholder="category" required ref="category"/>
          <input type="file" placeholder="video" />
          <input type="submit" value="Submit a challenge"/>
        </form>
        <Challenge challenges={this.props.challenges} />
      </div>
    );
  }
}

export default ChallengeTable;