
const reducer = (state, action) => {
  switch (action.type) {
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
  }
};

export default reducer;
