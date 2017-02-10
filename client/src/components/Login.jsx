import React from 'react';

class Login extends React.Component {

  //console.log(this.refs.username.value);
  render() {
    return(
      <div className="container-login">
        <form action="/api/signin" method="post">
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