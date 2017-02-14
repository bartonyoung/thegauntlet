import React from 'react';
import ChallengeList from './ChallengeList.jsx';
import path from 'path';
import actions from '../../redux/actions.js';
import $ from 'jquery';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';

class ChallengeTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getAllChallenges();
  }

  getAllChallenges() {
    let outer = this;
    $.get('/api/allChallenges').done(data => {
      data = data.reverse();
      outer.props.dispatch(actions.addChallenge(data));
    });
  }

  handleSubmit() {
    let outer = this;
    var fd = new FormData(document.querySelector('#file'));
    $.ajax({
      url: '/api/s3',
      type: 'POST',
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success: function(resp) {
        console.log(resp);
        $.ajax({
          url: '/api/challenge',
          type: 'POST',
          data: {
            title: outer.refs.title.value,
            description: outer.refs.description.value,
            category: outer.refs.category.value,
            filename: resp
          },
          success: function(data) {
            outer.refs.title.value = '';
            outer.refs.description.value = '';
            outer.refs.category.value = '';
            outer.refs.video.value = '';
            outer.getAllChallenges();
            return data;
          }
        });
        return;
      }
    });
  }

  render() {
    return (
      <div>
        <form id="challenge">
          <input type="text" placeholder="Name your challenge" required ref="title" name="title"/>
          <input type="text" placeholder="Description" required ref="description" name="description"/>
          <input type="text" placeholder="category" required ref="category" name="category"/>
        </form>
        <form ref="file" id="file">
          <input type="file" placeholder="video" required ref="video" name="video"/>
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
        <ChallengeList dispatch={this.props.dispatch}/>
      </div>
    );
  }
}

export default ChallengeTable;