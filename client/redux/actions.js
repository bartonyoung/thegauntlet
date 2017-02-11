let actions = {
  addChallenge: function(challenge) {
    return {
      type: 'ADD_CHALLENGE',
      payload: {
        title: challenge.title,
        description: challenge.description,
        category: challenge.category
      }
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