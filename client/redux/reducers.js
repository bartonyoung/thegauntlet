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
      comments: action.payload
    });
  case 'GET_LEADERS':
    return Object.assign({}, state, {
      leaders: action.payload
    });
  case 'ADD_USER':
    return Object.assign({}, state, {
      user: action.payload
    });
  case 'SET_CATEGORY':
    return Object.assign({}, state, {
      currentCategory: action.payload
    });
  case 'SET_VIEW':
    return Object.assign({}, state, {
      profileView: action.payload
    });
  case 'GET_FOLLOWERS':
    return Object.assign({}, state, {
      followers: action.payload
    });
  default:
    return state;
  }
};

export default reducer;
