import React from 'react';
import Response from './Response.jsx';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import Comments from './Comments.jsx';
import NavBar from './Nav.jsx';


class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
    let newComments = '';
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
          }
        });
      }
    });
  }

  commentSubmit(e) {
    e.preventDefault();
    let outer = this;
    let comments = {
      comment: this.refs.comment.value,
      challenge_id: window.sessionStorage.id
    };

    $.post('/api/comments', comments).done(data => {
      this.props.dispatch(actions.addComment(data));
      outer.renderComments();
      outer.refs.comment.value = '';
    });
  }

  renderComments() {
    console.log('rendering');
    let outer = this;
    $.get('/api/comments', {
      challenge_id: window.sessionStorage.getItem('id')
    }).done(data => {
      outer.newComments = data;
      console.log('newComments:', outer.newComments);
    });
  }

  render() {
    let checkFile = (type, response) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video width="320" height="240" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket420/' + response.filename} type="video/mp4"/>*/}
        </video>);  
      } else {
        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket420/' + response.filename} width="320" height="240" />;
      }
    };
    return (
      <div>

        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout} handleDisply={this.props.handleDisply}/>
        <h1>{'Challenge Title: ' + window.sessionStorage.title}</h1>
        {checkFile(window.sessionStorage.filename.split('.').pop(), window.sessionStorage)}
        <h4>{'Description: ' + window.sessionStorage.description}</h4>
        <form onSubmit={this.commentSubmit}>
          <textarea name="comment" required ref="comment" placeholder="Enter comment..."></textarea>
          <input type="submit"/>
        </form>
        <Comments newComments={this.newComments}/>
        {'Upload your response: '}
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
};

export default connect(mapStateToProps)(ChallengeComponent);
