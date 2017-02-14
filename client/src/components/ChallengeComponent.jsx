import React from 'react';
import Response from './Response.jsx';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import $ from 'jquery';

class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let outer = this;
    $.ajax({
      url: '/api/response',
      type: 'GET',
      data: {
        parent_id: window.sessionStorage.getItem('id')
      },
      success: function(data) {
        data = data.reverse();
        outer.props.dispatch(actions.addResponse(data));
      }
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
        $.ajax({
          url: '/api/response',
          type: 'POST',
          data: {
            title: outer.refs.title.value,
            description: outer.refs.description.value,
            category: outer.refs.category.value,
            filename: resp,
            parent_id: window.sessionStorage.getItem('id')
          },
          success: function(data) {
            outer.refs.title.value = '';
            outer.refs.description.value = '';
            outer.refs.category.value = '';
            outer.refs.video.value = '';
            outer.componentDidMount();
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
        <h1>{"Challenge Title: " + window.sessionStorage.title}</h1>
        <h4>{"Description: " + window.sessionStorage.description}</h4>
        {"Upload your response: "}
        <form id="challenge">
          <input type="text" placeholder="Name your challenge" required ref="title" name="title"/>
          <input type="text" placeholder="Description" required ref="description" name="description"/>
          <input type="text" placeholder="category" required ref="category" name="category"/>
        </form>
        <form ref="file" id="file">
          <input type="file" placeholder="video" required ref="video" name="video"/>
        </form>
          <button onClick={this.handleSubmit}>Submit</button>
        <Response />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(ChallengeComponent);
