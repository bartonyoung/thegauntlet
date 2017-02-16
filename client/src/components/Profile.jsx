import React from 'react';
import $ from 'jquery';

class Profile extends React.Component {

  componentDidMount() {
    $.get('/api/profile/')
  }

  render() {

    return(
      <div>
        Hi
      </div>
    );
  }
}

export default Profile;