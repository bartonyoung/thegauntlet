let actions = {
  addChallenge: function(challenge) {
    console.log("THIS IS THE PAYLOAD", challenge);
    return {
      type: 'ADD_CHALLENGE',
      payload: challenge
    };
  },

  addUser: function(user) {
    return {
      type: 'ADD_USER',
      payload: user
    };
  }
};

export default actions;