import React from 'react';
import Response from './Response.jsx';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import Comments from './Comments.jsx';
import NavBar from './Nav.jsx';
import css from '../styles/nav.css';
import moreCSS from '../styles/challengeComponent.css';


class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.commentSubmit = this.commentSubmit.bind(this);
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
        let responseArr = [];
        data.forEach(response => {
          if (response.parent_id) {
            responseArr.push(response);
          }
        });
        outer.props.dispatch(actions.addResponse(responseArr.reverse()));
      }
    });
    $.get('/api/comments', {
      challenge_id: window.sessionStorage.getItem('id')
    }).done(data => {
      data.forEach(comment => {
        outer.props.dispatch(actions.addComment(data));
      });
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
            outer.props.dispatch(actions.addResponse(data));
            outer.refs.title.value = '';
            outer.refs.description.value = '';
            outer.refs.category.value = '';
            outer.refs.video.value = '';
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
    $.post('/api/comments', comments).then(() => {
      $.get('/api/comments', {
        challenge_id: window.sessionStorage.getItem('id')
      }).then(data => {
        outer.props.dispatch(actions.addComment(data));
        outer.refs.comment.value = '';
      });
    });
  }

  renderComments() {
    let outer = this;
    $.get('/api/comments', {
      challenge_id: window.sessionStorage.getItem('id')
    }).done(data => {
      outer.newComments = data;
    });
  }


  render() {
    let checkFile = (type, response) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video className="parent" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + response.filename} type="video/mp4"/>*/}
        </video>);
      } else {
        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucke  t421/' + response.filename} width="320" height="240" />;
        return <img className="parent" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />;
      }
    };
    return (
      <div className="container-fluid">
        <center><h4 className="title">The Gauntlet</h4></center>
        <hr />
        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout} editProfile={this.props.editProfile}/>
        <hr />
        <h1>{'Challenge Title: ' + window.sessionStorage.title}</h1>
        <h4>{'Description: ' + window.sessionStorage.description}</h4>
        {checkFile(window.sessionStorage.filename.split('.').pop(), window.sessionStorage)}
        <p>{'Upvotes: ' + window.sessionStorage.upvotes}</p>

        <form onSubmit={this.commentSubmit}>
          <textarea name="comment" required ref="comment" placeholder="Enter comment..."></textarea>
          <input type="submit"/>
        </form>
        <Comments />
        {'Upload your response: '}
        <form id="challenge">
          <input type="text" placeholder="Name your response" required ref="title" name="title"/>
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
