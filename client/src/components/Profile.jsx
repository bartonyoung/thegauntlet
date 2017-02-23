import React from 'react';
import $ from 'jquery';
import css from '../styles/ProfilePictureEditor.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import ProfileContent from './ProfileContent.jsx';
import NavBar from './Nav.jsx';

class Profile extends React.Component {

  componentDidMount() {
    let outer = this;
    $.get('/api/response', {
      parent_id: window.sessionStorage.getItem('id')
    }).done(data => {
      let responseArr = [];
      data.forEach(response => {
        if (response.parent_id) {
          responseArr.push(response);
        }
      });
      outer.props.dispatch(actions.getResponses(responseArr));
    });
    $.get('/api/comments', {
      username: window.sessionStorage.username
    }).done(data => {
      console.log('comment data', data);
    });
  }

  render() {
    if (this.props.user) {
      return (
        <div className='container-fluid profile'>
          <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout}/>
          <ProfileContent />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Profile);