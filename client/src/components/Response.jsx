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
  }

  upVoteClick(id) {
    const outer = this;
    $.post('/api/upvote', {
      vote: 1,
      challenge_id: id
    }).then(()=> {
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

  onUsernameClick(username) {
    window.sessionStorage.setItem('username', username);
  }

  render() {
    let checkFile = (type, response) => {
      const fileType = {
        'mp4': 'THIS IS A VIDEO!'
      };
      if (fileType[type]) {
        return (<video className="response" controls>
          {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + response.filename} type="video/mp4"/>*/}
        </video>);
      } else {
        return <img className="response" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />;

        // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + response.filename} width="320" height="240" />;
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

    let mappedResponses = this.props.responses.map((response, i) => {
      if (response.parent_id === parseInt(window.sessionStorage.id)) {
        return (
          <div>
            <h4>{'Response title: ' + response.title}</h4>
            <h5>{'Description: ' + response.description}</h5>
            {checkFile(response.filename.split('.').pop(), response)}<br/>
            <Link onClick={() => this.onUsernameClick(response.username)} to={`/profile/${response.username}`}>{response.username}</Link><br/>
            <h5>{`Views : ${response.views}`}</h5>
            {whichButton(response.user_id)}
            <a onClick={()=> this.upVoteClick(response.id)}>{'Upvote'}</a><p>{`${response.upvotes}`}</p>
          </div>
        );
      }
    });

    return <div className="response container">{mappedResponses}</div>;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Response);