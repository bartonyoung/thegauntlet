
const reducer = (state, action) => {
  switch (action.type) {
<<<<<<< HEAD
  case 'ADD_CHALLENGE':
    return Object.assign({}, state, {

      challenges: action.payload 
    });
  case 'ADD_RESPONSE':
    return Object.assign({}, state, {
      responses: action.payload
    });
  default:
    return state; 
=======
    case 'ADD_CHALLENGE':
      return Object.assign({}, state, {
        challenges: action.payload
      })
    case 'ADD_RESPONSE':
      return Object.assign({}, state, {
        responses: action.payload
      })
    case 'ADD_COMMENT':
      return Object.assign({}, state, {
        comments: [action.payload, ...state.comments]
      })
    default:
      return state
>>>>>>> Refactor to show updated state on each post
  }
};

export default reducer;
