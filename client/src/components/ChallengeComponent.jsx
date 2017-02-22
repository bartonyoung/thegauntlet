import React from 'react';
import ResponseList from './ResponseList.jsx';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import Comments from './Comments.jsx';
import NavBar from './Nav.jsx';
import css from '../styles/nav.css';
import moreCSS from '../styles/challengeComponent.css';
import { Link } from 'react-router';

class ChallengeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.editChallenge = this.editChallenge.bind(this);
    this.saveChallenge = this.saveChallenge.bind(this);
    this.deleteChallenge = this.deleteChallenge.bind(this);

    this.state = {
      isEditing: false
    };
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
        console.log('response data', data)
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

    $.get('/api/favorite').done(data => {
      outer.props.dispatch(actions.setFavorites(data));
    });
  }

  handleSubmit() {
    let outer = this;
    var fd = new FormData(document.querySelector('#upload'));
    if (this.refs.video.value) {
      $.ajax({
        url: '/api/s3',
        type: 'POST',
        data: fd,
        processData: false,  // tell jQuery not to process the data
        contentType: false,   // tell jQuery not to set contentType
        success: function(resp) {
          let created_at = new Date().getTime();

          $.ajax({
            url: '/api/response',
            type: 'POST',
            data: {
              title: outer.refs.title.value,
              description: outer.refs.description.value,
              category: outer.refs.category.value,
              filename: resp,
              parent_id: window.sessionStorage.getItem('id'),
              created_at: created_at
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
    } else {
      alert('Don\'t forget to submit a file');
    }
  }

  saveChallenge(e) {
    let outer = this;
    this.setState({
      isEditing: !this.state.isEditing
    });

    $.ajax({
      url: '/api/challenge/' + window.sessionStorage.id,
      type: 'PUT',
      data: {
        title: this.refs.title.value,
        description: this.refs.description.value
      },
      success: function(data) {
        alert('Successfully edited!');
        window.location.href = '/#/dash';
      }
    });
  }

  deleteChallenge() {
    $.ajax({
      url: '/api/challenge/' + window.sessionStorage.id,
      type: 'DELETE',
      success: function(data) {
        alert('Successfully deleted!');
        window.location.href = '/#/dash';
      }
    });
  }

  editChallenge() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  onChallengeClick(challenge) {
    let outer = this;
    $.get('/api/profile/' + window.sessionStorage.username).done(user => {
      outer.props.dispatch(actions.addUser(user));
    });
  }

  render() {
    let taskButtons = () => {
      if (window.sessionStorage.getItem('key') === window.sessionStorage.username) {
        if (!this.state.isEditing) {
          return (
            <div>
              <button className="btn btn-large btn-default edit" onClick={() => { this.editChallenge(); }}>
                {'Edit'}
              </button>
              <button className="btn btn-large btn-default delete" onClick={() => this.deleteChallenge()}>Delete</button>
            </div>
          );
        }

        return (
          <div>
            <div className="editor">
              <form id="editform" onSubmit={() => { this.saveChallenge(); }}>
                <input type="text" placeholder="Edit title" required ref="title"/><br/>
                <input type="text" placeholder="Edit description" required ref="description"/>
              </form>
              <button type="submit" form="editform" value="submit" className="btn btn-large btn-default edit">
                {'Save'}
              </button>
              <button className="btn btn-large btn-default delete" onClick={() => this.deleteChallenge()}>Delete</button>
            </div>
          </div>
        );
      }
    };

    let checkFile = (type, response) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video className="parentMedia" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + response.filename} type="video/mp4"/>*/}
        </video>);
      } else {
        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucke  t421/' + response.filename} width="320" height="240" />;
        return <img className="parentMedia" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />;
      }
    };


    let calculateTime = (seconds) => {
      if (seconds < 60) {
        return Math.floor(seconds) + ' seconds ago';
      } else if (seconds >= 60 && seconds < 3600) {
        if (seconds < 120) {
          return ' 1 minute ago';
        } else {
          return Math.floor(seconds / 60) + ' minutes ago';
        }
      } else if (seconds >= 3600 && seconds < 86400) {
        if (seconds < 7200) {
          return ' 1 hour ago';
        } else {
          return Math.floor(seconds / 3600) + ' hours ago';
        }
      } else if (seconds >= 86400 && seconds < 604800) {
        if (seconds < 172800) {
          return ' 1 day ago';
        } else {
          return Math.floor(seconds / 86400) + ' days ago';
        }
      } else if (seconds >= 2592000 && seconds < 31104000) {
        if (seconds < 5184000) {
          return ' 1 month ago';
        } else {
          return Math.floor(seconds / 2592000) + ' months ago';
        }
      } else {
        if (seconds < 62208000) {
          return ' 1 year ago';
        } else {
          return Math.floor(seconds / 31104000) + ' years ago';
        }
      }
    };

    let timeDifferenceInSeconds = (new Date().getTime() - parseInt(window.sessionStorage.created_at)) / 1000;

    return (
      <div className="container-fluid">
        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout} editProfile={this.props.editProfile}/>
        <div className="row parentChallenge">
          <div className="col-xl-6 col-xl-offset-2 col-lg-6 col-lg-offset-2 col-md-6 col-md-offset-2">
            <h1>{window.sessionStorage.title}</h1>
            {checkFile(window.sessionStorage.filename.split('.').pop(), window.sessionStorage)}<br/>
            <h4>{window.sessionStorage.description}</h4>
            <h3><Link onClick={() => this.onChallengeClick()} to={`/profile/${window.sessionStorage.username}`} className="userLink">{window.sessionStorage.username}</Link></h3>
            {calculateTime(timeDifferenceInSeconds)}
            {taskButtons()}
            <p>{'Upvotes: ' + window.sessionStorage.upvotes}</p>
          </div>
          <div className="col-xl-3 col-xl-offset-1 col-lg-3  col-lg-offset-1 col-md-3 col-md-offset-1">
            <Comments />
          </div>
        </div>
        {'Upload your response: '}
        <form id="challenge">
          <input type="text" placeholder="Name your response" required ref="title" name="title"/>
          <input type="text" placeholder="Description" required ref="description" name="description"/>
          <input type="text" placeholder="category" required ref="category" name="category"/>
        </form>
        <form ref="file" id="upload">
          <input type="file" placeholder="video" required ref="video" name="video"/>
        </form>
          <button onClick={this.handleSubmit}>Submit</button>

        <ResponseList />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ChallengeComponent);
