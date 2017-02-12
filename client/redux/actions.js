let actions = {
  addChallenge: function(challenge) {
    console.log("THIS IS THE PAYLOAD", challenge);
    return {
      type: 'ADD_CHALLENGE',
      // payload: {
      //   title: challenge.title,
      //   description: challenge.description,
      //   category: challenge.category,
      //   id: challenge.id,
      //   views: challenge.views,
      //   filename: challenge.filename,
      //   upvotes: challenge.upvotes,
      //   parent_id: challenge.parent_id,
      //   user_id: challenge.user_id,
      //   created_at: challenge.created_at
      // }
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