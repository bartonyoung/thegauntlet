let actions = {
  addUser: function (user) {
    return {
      type: 'ADD_USER',
      user: user
    }
  }
}

export default actions