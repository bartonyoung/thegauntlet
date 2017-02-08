import React from 'react';

class Login extends React.Component {

  render() {
    return(
      <div className="container-login">
        <form type="submit">
          <p>Username</p>
          <input type="text" required ref="username" />
          <p>Password</p>
          <input type="text" required ref="password" />
          <p>
            <input type="submit" value="Login" />
          </p>
        </form>
      </div>
    );
  }
}

export default Login;