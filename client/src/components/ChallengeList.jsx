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
    console.log('clicked here', challenge)
    window.localStorage.setItem('title', challenge.title);
    window.localStorage.setItem('id', challenge.id);
    window.localStorage.setItem('description', challenge.description);
    window.localStorage.setItem('category', challenge.category);

    console.log('window.localStorage', window.localStorage)
    return (
      <ChallengeComponent challenge={challenge} />
    );
    window.location.href = "/#/challenge";
  }

        // <ChallengeView
        //   key={i}
        //   id={challenge.id}
        //   title={challenge.title}
        //   description={challenge.description}
        //   category={challenge.category}
        //   onChallengeClick={this.onChallengeClick}
        // />
  render() {
    let mappedChallenges = this.props.challenges.map((challenge, i) => {
      return <div onClick={() => this.onChallengeClick(challenge)}>
        <a href='/#/challenge'>
        {challenge.title}
      </a>
      </div>;
      })

    return <div>{mappedChallenges}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeList);
