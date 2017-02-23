const reducer = (state, action) => {
  if (action.type === 'GET_CHALLENGES') {
    return Object.assign({}, state, {
      challenges: action.payload
    });
  } else if (action.type === 'ADD_CHALLENGE') {
    let challengeObj = {};

    for (var keys in state) {
      if (keys === 'challenges') {
        challengeObj[keys] = [];
        challengeObj[keys].push(action.payload[0]);
        state[keys].forEach((key, i) => {
          challengeObj[keys].push(key);
        });
      } else {
        challengeObj[keys] = state[keys];
      }
    }

    return challengeObj;
  } else if (action.type === 'GET_RESPONSES') {
    return Object.assign({}, state, {
      responses: action.payload
    });
  } else if (action.type === 'ADD_RESPONSE') {
    let responseObj = {};

    for (var keys in state) {
      if (keys === 'responses') {
        responseObj[keys] = [];
        responseObj[keys].push(action.payload[0]);
        state[keys].forEach((key, i) => {
          responseObj[keys].push(key);
        });
      } else {
        responseObj[keys] = state[keys];
      }
    }

    return responseObj;
  } else if (action.type === 'GET_COMMENTS') {
    return Object.assign({}, state, {
      comments: action.payload
    });
  } else if (action.type === 'ADD_COMMENT') {
    let commentObj = {};

    for (var keys in state) {
      if (keys === 'comments') {
        commentObj[keys] = [];
        commentObj[keys].push(action.payload[0]);
        state[keys].forEach((key, i) => {
          commentObj[keys].push(key);
        });
      } else {
        commentObj[keys] = state[keys];
      }
    }

    return Object.assign({}, commentObj);
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
  } else if (action.type === 'UPDATE_POST') {
    let updateObj = {};

    for (var keys in state) {
      if (keys === 'responses' || keys === 'challenges') {
        updateObj[keys] = [];
        state[keys].forEach((key, i) => {
          if (key.id === action.payload[0].id) {
            updateObj[keys][i] = action.payload[0];
          } else {
            updateObj[keys][i] = key;
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
