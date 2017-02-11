// const getId = (state) => {
//   return state.challenges.reduce((maxId, challenge) => {
//     return Math.max(challenge.id, maxId);
//   }, -1) + 1;
// };

const reducer = (state, action) => {
  console.log('paylod:', action.payload)
  switch (action.type) {
    case 'ADD_CHALLENGE':
      return Object.assign({}, state, {
        challenges: [action.payload, ...state.challenges]
      })
    default:
      return state;
  }
};

export default reducer;
