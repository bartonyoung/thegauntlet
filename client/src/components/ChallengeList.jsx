import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import ChallengeComponent from './ChallengeComponent.jsx';

class ChallengeList extends React.Component {
  constructor(props) {
    super(props);

    this.onChallengeClick = this.onChallengeClick.bind(this);
  }

  onChallengeClick(challenge) {
    console.log('clicked here', challenge);
    window.sessionStorage.setItem('title', challenge.title);
    window.sessionStorage.setItem('id', challenge.id);
    window.sessionStorage.setItem('description', challenge.description);
    window.sessionStorage.setItem('category', challenge.category);

    console.log('window.sessionStorage', window.sessionStorage);
    return (
      <ChallengeComponent challenge={challenge} />
    );
    window.location.href = '/#/challenge';
  }

  render() {
    let mappedChallenges = this.props.challenges.map((challenge, i) => {
      return <div onClick={() => this.onChallengeClick(challenge)}>
        <a href='/#/challenge'>
        {challenge.title}
      </a>
      </div>;
    });

    return <div>{mappedChallenges}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeList);
