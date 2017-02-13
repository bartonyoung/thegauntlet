import React from 'react';
import ChallengeList from './ChallengeList.jsx';
import path from 'path';
import actions from '../../redux/actions.js';
import $ from 'jquery';

class ChallengeTable extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    console.log('actions', actions)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getAllChallenges();
  }

  getAllChallenges() {
    let outer = this;
     $.get('/api/allChallenges').done(data => {
      outer.props.dispatch(actions.addChallenge(data));
    });
  }

  handleSubmit() {
    let outer = this;
    $('#challenge').submit(e => {
      e.preventDefault();
    }, resp => {
      outer.getAllChallenges();
      return resp;
    });
  }

  render() {
    return (
      <div>
        <form id="challenge" encType="multipart/form-data" action="/api/challenge" method="post">
          <input type="text" placeholder="Name your challenge" required ref="title" name="title"/>
          <input type="text" placeholder="Description" required ref="description" name="description"/>
          <input type="text" placeholder="category" required ref="category" name="category"/>
          <input type="file" placeholder="video" required ref="video" name="video"/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        <ChallengeList dispatch={this.props.dispatch}/>
      </div>
    );
  }
}

export default ChallengeTable;