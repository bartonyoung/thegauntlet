import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import $ from 'jquery';
import css from '../styles/response.css';
import { Link } from 'react-router';


class Response extends React.Component {
  constructor(props) {
    super(props);

    this.upVoteClick = this.upVoteClick.bind(this);
    this.onUsernameClick = this.onUsernameClick.bind(this);

    this.state = {
      isEditing: false
    };
  }

  upVoteClick(id) {
    const outer = this;
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: id
    }).then(() => {
      $.get('/api/response', {parent_id: window.sessionStorage.getItem('id')})
        .then((data)=> {
          data = data.reverse();
          outer.props.dispatch(actions.addResponse(data));
        });
    });
  }

  followTheLeader(leaderId) {
    const outer = this;
    $.post('/api/follower', {
      leader_id: leaderId
    }).then(() => {
      $.get('/api/getLeaders').then(leaders => {
        outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
      });
    });
  }

  unFollow (leaderId) {
    const outer = this;
    $.post('/api/unFollow', {
      leader_id: leaderId
    }).then(() => {
      $.get('/api/getLeaders').then(leaders => {
        outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
      });
    });
  }

  onUsernameClick(username) {
    window.sessionStorage.setItem('username', username);
  }

  saveChallenge(e) {
    let outer = this;
    this.setState({
      isEditing: !this.state.isEditing
    });

    $.ajax({
      url: '/api/response/' + window.sessionStorage.id,
      type: 'PUT',
      data: {
        title: this.refs.title.value,
        description: this.refs.description.value
      },
      success: function(data) {
        window.location.href = "/#/dash";
        alert('Successfully edited!');
      }
    });
  }

  deleteResponse() {
    $.ajax({
      url: '/api/response/' + window.sessionStorage.id,
      type: 'DELETE',
      success: function(data) {
        window.location.href = "/#/dash";
        alert('Successfully deleted!');
      }
    });
  }

  editResponse() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    let taskButtons = () => {
      if (window.sessionStorage.getItem('key') === window.sessionStorage.username) {
        if (!this.state.isEditing) {
          return (
            <div>
              <button className="btn btn-large btn-default edit" onClick={() => {this.editResponse()}}>
                {'Edit'}
              </button>
              <button className="btn btn-large btn-default delete" onClick={() => this.deleteResponse()}>Delete</button>
            </div>
          );
        }

        return (
          <div>
            <div className="editor">
              <form id="editform" onSubmit={() => {this.saveChallenge()}}>
                <input type="text" placeholder="Edit title" required ref="title"/><br/>
                <input type="text" placeholder="Edit description" required ref="description"/>
              </form>
              <button type="submit" form="editform" value="submit" className="btn btn-large btn-default edit">
                {'Save'}
              </button>
              <button className="btn btn-large btn-default delete" onClick={() => this.deleteResponse()}>Delete</button>
            </div>
          </div>
        );
      }
    };

    let checkFile = (type, responseFilename) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video className="response" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + responseFilename} type="video/mp4"/>*/}
        </video>);
      } else {
        return <img className="response" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />;

        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + responseFilename} width="320" height="240" />;
      }
    };

    let whichButton = (leaderId) => {
      if (this.props.leaders.includes(leaderId)) {
        return (
          <button className="btn btn-default btn-sm pull-right"onClick={() => this.unFollow(leaderId)}>
            <span className="glyphicon glyphicon-ok"></span>{'  Unfollow'}
          </button>
        );
      } else {
        return (
        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} width="320" height="240" />;
          <button className="btn btn-default btn-sm pull-right" onClick={() => this.followTheLeader(leaderId)}>
            <span className="glyphicon glyphicon-ok"></span>{'  Follow'}
          </button>
        );
      }
    };

    // let isNotification = () => {
    //   console.log('mailbox');
    //   console.log(window.sessionStorage.respTitle, window.sessionStorage.respDescription)
    //   return (
    //     <div>
    //       <h4>{'Response title: ' + window.sessionStorage.respTitle}</h4>
    //       <h5>{'Description: ' + window.sessionStorage.respDescription}</h5>
    //       {taskButtons()}
    //       {checkFile(window.sessionStorage.respFilename.split('.').pop(), window.sessionStorage.respFilename)}<br/>
    //       <Link onClick={() => this.onUsernameClick(window.sessionStorage.respUsername)} to={`/profile/${window.sessionStorage.respUsername}`}>{window.sessionStorage.respUsername}</Link><br/>
    //       <h5>{`Views : ${window.sessionStorage.respViews}`}</h5>
    //       {whichButton(window.sessionStorage.respUser_id)}
    //       <a onClick={()=> this.upVoteClick(window.sessionStorage.respId)}>{'Upvote'}</a><p>{`${window.sessionStorage.respUpvotes}`}</p>
    //     </div>
    //   );
    // }

    let mappedResponses = this.props.responses.map((response, i) => {
      if (response.parent_id === parseInt(window.sessionStorage.id)) {
        if (this.props.profileView === 'all' && !window.sessionStorage.respTitle) {
          console.log('responses')
          return (
            <div>
              <h4>{'Response title: ' + response.title}</h4>
              <h5>{'Description: ' + response.description}</h5>
              {taskButtons()}
              {checkFile(response.filename.split('.').pop(), response.filename)}<br/>
              <Link onClick={() => this.onUsernameClick(response.username)} to={`/profile/${response.username}`}>{response.username}</Link><br/>
              <h5>{`Views : ${response.views}`}</h5>
              {whichButton(response.user_id)}
              <a onClick={()=> this.upVoteClick(response.id)}>{'Upvote'}</a><p>{`${response.upvotes}`}</p>
            </div>
          );
        } else if (i === 0) {
          console.log('mailbox response', window.sessionStorage.respTitle, response.title)
          return (
            <div>
              <h4>{'Response title: ' + window.sessionStorage.respTitle}</h4>
              <h5>{'Description: ' + window.sessionStorage.respDescription}</h5>
              {taskButtons()}
              {checkFile(window.sessionStorage.respFilename.split('.').pop(), window.sessionStorage.respFilename)}<br/>
              <Link onClick={() => this.onUsernameClick(window.sessionStorage.respUsername)} to={`/profile/${window.sessionStorage.respUsername}`}>{window.sessionStorage.respUsername}</Link><br/>
              <h5>{`Views : ${window.sessionStorage.respViews}`}</h5>
              {whichButton(window.sessionStorage.respUser_id)}
              <a onClick={()=> this.upVoteClick(window.sessionStorage.respId)}>{'Upvote'}</a><p>{`${window.sessionStorage.respUpvotes}`}</p>
            </div>
          );
        }
      }
    });

    return <div className="response container">{mappedResponses}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Response);