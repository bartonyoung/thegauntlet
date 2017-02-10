import React from 'react';
import $ from 'jquery';

class Login extends React.Component {

  handleLogin(e) {
    e.preventDefault();
    let login = {
      user: this.refs.username.value,
      password: this.refs.password.value
    };

    $.post('/login', login)
    .done(data =>
      console.log("logged into...THE GAUNTLET")
    );
  }

  render() {
    return (
      <div className="container-login">
        <form action="/api/signin" method="post">
          <p>Username</p>
          <input type="text" required ref="username" />
          <p>Password</p>
          <input type="password" required ref="password" />
          <p>
            <input type="submit" value="Login" />
          </p>
        </form>
      </div>
    );
  }
}

export default Login;