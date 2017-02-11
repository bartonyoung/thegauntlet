import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';

const Dash = ({challenges, handleSubmitChallenge, dispatch, handleLogout}) => (
  <div>
    <a href="#" onClick={handleLogout}>logout</a>
    <ChallengeTable handleSubmitChallenge={handleSubmitChallenge} dispatch={dispatch} challenges={challenges}/>
  </div>
);

export default Dash;
  // {userInfo.map((user, i) =>
  //   <p>{user.username + ' is ' + user.ranking}</p>
  //   )}
