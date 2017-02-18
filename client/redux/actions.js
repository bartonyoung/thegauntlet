let actions = {
  addChallenge: function(challenge) {
    return {
      type: 'ADD_CHALLENGE',
      payload: challenge
    };
  },

  addResponse: function(response) {
    return {
      type: 'ADD_RESPONSE',
      payload: response
    };
  },

  addComment: function(comment) {
    return {
      type: 'ADD_COMMENT',
      payload: comment
    };
  },

  getLeaders: function(leaders) {
    return {
      type: 'GET_LEADERS',
      payload: leaders
    };
  },

  addUser: function(user) {
    return {
      type: 'ADD_USER',
      payload: user
    };
  },

  setCurrentCategory: function(category) {
    return {
      type: 'SET_CATEGORY',
      payload: category
    };
  },

  setProfileView: function(view) {
    return {
      type: 'SET_VIEW',
      payload: view,
    };
  },

  setFollowers: function(followers) {
    return {
      type: 'GET_FOLLOWERS',
      payload: followers,
    };
  }
};

export default actions;