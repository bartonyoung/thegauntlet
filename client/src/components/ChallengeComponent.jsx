import React from 'react';
import Response from './Response.jsx';
import $ from 'jquery';

class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);

    // console.log('inside challenge component', window.localStorage);
  }


  componentDidMount() {
    $.get('/api/allChallenges').done(data => {
      console.log('data');
    });
  }

  render() {

    return (
      <div>
        <h1>{'Challenge Title: ' + window.sessionStorage.getItem('title')}</h1>
        <h4>{'Description: ' + window.sessionStorage.getItem('description')}</h4>
        {'Upload your response: '}
        <form id="challenge" encType="multipart/form-data" action="/api/challenge" method="post">
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

export default ChallengeComponent;