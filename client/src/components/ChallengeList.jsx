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
    window.sessionStorage.setItem('filename', challenge.filename);
    window.sessionStorage.setItem('upvotes', challenge.upvotes);
    window.sessionStorage.setItem('views', challenge.views);

    return (
      <ChallengeComponent challenge={challenge} />
    );
    window.location.href = '/#/challenge';
  }

  render() {
    let mappedChallenges = this.props.challenges.map((challenge, i) => {
      return <div onClick={() => this.onChallengeClick(challenge)}>
        <h1><a href='/#/challenge'>{challenge.title}</a></h1>
        <video width="320" height="240" controls>
          <source src={"https://s3-us-west-1.amazonaws.com/thegauntletbucket420/" + challenge.filename} type="video/mp4"/>
        </video><br/>
        {'Upvotes: ' + challenge.upvotes + ' Views: ' + challenge.views}

      </div>;
    });

    return <div>{mappedChallenges}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeList);
