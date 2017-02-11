import React from 'react';
import Challenge from './Challenge.jsx';

class ChallengeTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  submitChallenge(e) {
    console.log(this.props)
    e.preventDefault();
    console.log(this.refs.challengeName.value);
    this.props.handleSubmitChallenge(this.refs.challengeName.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitChallenge.bind(this)}>
          <input type="text" placeholder="Name your challenge" required ref="challengeName"/>
          <input type="submit" value="Submit a challenge"/>
        </form>
        <Challenge users={this.props.users} />
      </div>
    );
  }
}

export default ChallengeTable;