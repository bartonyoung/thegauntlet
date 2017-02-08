import React from 'react';

const Dash = ({userInfo}) => (
  <div>
  {userInfo.map((user, i) =>
    <p>{user.username + ' is ' + user.ranking}</p>
    )}
  </div>
)

export default Dash;
    // <p>{user.username}</p>
    // <p>{'Rank: ' + user.ranking}</p>