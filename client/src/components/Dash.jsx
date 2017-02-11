import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';

const Dash = ({users, handleSubmitChallenge, handleLogout}) => (
  <div>
    <a href="#" onClick={handleLogout}>logout</a>
    <ChallengeTable handleSubmitChallenge={handleSubmitChallenge} users={users}/>
  </div>
);

export default Dash;
  // {userInfo.map((user, i) =>
  //   <p>{user.username + ' is ' + user.ranking}</p>
  //   )}
