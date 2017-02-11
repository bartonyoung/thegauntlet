const getId = (state) => {
  return state.users.reduce((maxId, user) => {
    return Math.max(user.id, maxId);
  }, -1) + 1;
};

const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_USER':
    return Object.assign({}, state, {
      users: [{
        user: action.addUser,
        id: getId(state)
      }, ...state.users]
    });
          
  default:
    return state;
  }
};

export default reducer;