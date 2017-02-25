let actions = {
  getChallenges: function(challenges) {
    return {
      type: 'GET_CHALLENGES',
      payload: challenges
    };
  },

  addChallenge: function(challenge) {
    return {
      type: 'ADD_CHALLENGE',
      payload: challenge
    };
  },

  getResponses: function (responses) {
    return {
      type: 'GET_RESPONSES',
      payload: responses
    };
  },

  addResponse: function(response) {
    return {
      type: 'ADD_RESPONSE',
      payload: response
    };
  },

  getComments: function(comments) {
    return {
      type: 'GET_COMMENTS',
      payload: comments
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

  setFavorites: function(favorites) {
    return {
      type: 'SET_FAVORITES',
      payload: favorites
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
  },
  getRanks: function(ranks) {
    return {
      type: 'GET_RANKS',
      payload: ranks,
    };
  },
  updatePost: function(post) {
    return {
      type: 'UPDATE_POST',
      payload: post
    };
  },
  getUpvoted: function(upvote) {
    return {
      type: 'GET_UPVOTED',
      payload: upvote
    };
  },
  getDownvoted: function(downvote) {
    return {
      type: 'GET_DOWNVOTED',
      payload: downvote
  addMessage: function(message) {
    return {
      type: 'ADD_MESSAGE',
      payload: message
    };
  }
};

export default actions;