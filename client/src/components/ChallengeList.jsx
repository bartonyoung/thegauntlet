import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import ChallengeComponent from './ChallengeComponent.jsx';
import $ from 'jquery';

class ChallengeList extends React.Component {
  constructor(props) {
    super(props);
    this.onChallengeClick = this.onChallengeClick.bind(this);
    this.upVoteClick = this.upVoteClick.bind(this);
  }

  onChallengeClick(challenge) {
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

  upVoteClick(index, id) {
    const outer = this;
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: id
    }).then(()=> {
      $.get('/api/allChallenges/')
        .then((data)=> {
          data = data.reverse();
          outer.props.dispatch(actions.addChallenge(data));
        });
    });
  }

  render() {
    let mappedChallenges = this.props.challenges.map((challenge, i) => {
      return <div>
        <h1 onClick={() => this.onChallengeClick(challenge)}><a href='/#/challenge'>{challenge.title}</a></h1>
        <video width="320" height="240" controls>
          {/*<source src={"https://s3-us-west-1.amazonaws.com/thegauntletbucket420/" + challenge.filename} type="video/mp4"/>*/}
        </video><br/>
        {' Views: ' + challenge.views}
        <a onClick={()=> this.upVoteClick(i, challenge.id)}>{'Upvote'}</a><p>{`${challenge.upvotes}`}</p>
      </div>;
    });

    return <div>{mappedChallenges}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeList);
