// const getId = (state) => {
//   return state.challenges.reduce((maxId, challenge) => {
//     return Math.max(challenge.id, maxId);
//   }, -1) + 1;
// };

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
    default:
      return state;
  }
};

export default reducer;
