const reducer = (state, action) => {
  console.log("state", state)
  console.log('action.payload', action.payload)
  if (action.type === 'ADD_CHALLENGE') {
    return Object.assign({}, state, {
      challenges: action.payload
    });
  } else if (action.type === 'ADD_RESPONSE') {
    return Object.assign({}, state, {
      responses: action.payload
    });
  } else if (action.type === 'ADD_COMMENT') {
    return Object.assign({}, state, {
      comments: action.payload
    });
  } else if (action.type === 'GET_LEADERS') {
    return Object.assign({}, state, {
      leaders: action.payload
    });
  } else if (action.type === 'ADD_USER') {
    return Object.assign({}, state, {
      user: action.payload
    });
  } else if (action.type === 'SET_CATEGORY') {
    return Object.assign({}, state, {
      currentCategory: action.payload
    });
  } else if (action.type === 'SET_VIEW') {
    return Object.assign({}, state, {
      profileView: action.payload
    });
  } else if (action.type === 'GET_FOLLOWERS') {
    return Object.assign({}, state, {
      followers: action.payload
    });
  } else if (action.type === 'GET_RANKS') {
    return Object.assign({}, state, {
      ranks: action.payload
    });
  } else if (action.type === 'SET_FAVORITES') {
    return Object.assign({}, state, {
      favorites: action.payload
    });
  } else if (action.type === 'UPDATE_RESPONSE') {
    let updateObj = {};

    for (var keys in state) {
      if (keys === 'responses') {
        updateObj[keys] = [];
        state[keys].forEach((response, i) => {
          if (response.id === action.payload[0].id) {
            updateObj[keys][i] = action.payload[0];
          } else {
            updateObj[keys][i] = response;
          }
        });
      } else {
        updateObj[keys] = state[keys];
      }
    }

    return Object.assign({}, updateObj);
  } else {
    return state;
  }
};

export default reducer;
