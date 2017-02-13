import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';

const Dash = ({challenges, handleSubmitChallenge, dispatch, handleLogout}) => (
  <div>
    <h1>{window.sessionStorage.getItem('key')}</h1>
    <a href="#" onClick={handleLogout}>logout</a>
    <ChallengeTable dispatch={dispatch} />
  </div>
);

export default Dash;
  // {userInfo.map((user, i) =>
  //   <p>{user.username + ' is ' + user.ranking}</p>
  //   )}
