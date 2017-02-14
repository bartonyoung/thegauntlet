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

  upVote: function(index) {
    console.log('THIS IS THE PAY LOAD', index);
    return {
      type: 'UPVOTE',
      payload: index
    };
  }
};

export default actions;