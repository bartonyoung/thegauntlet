
const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_CHALLENGE':
    return Object.assign({}, state, {
      challenges: action.payload
    });
  case 'ADD_RESPONSE':
    return Object.assign({}, state, {
      responses: action.payload
    });
  case 'ADD_COMMENT':
    return Object.assign({}, state, {
      comments: [action.payload, ...state.comments] 
    });
  case 'UPVOTE':
    let newChallenges = state.challenges.slice();
    // console.log('BEFORE', newChallenges[action.payload].upvotes);
    newChallenges[action.payload].upvotes = newChallenges[action.payload].upvotes + 1;  
    // console.log('AFTER', newChallenges[action.payload].upvotes);
    return Object.assign({}, state, {
      challenges: newChallenges   
    });    
  default: 
    return state;
  }
};

export default reducer;
