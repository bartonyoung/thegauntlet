import React from 'react';
import $ from 'jquery';

class Login extends React.Component {

  handleLogin(e) {
    e.preventDefault();
    let login = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };

    $.post('/api/login', login)
    .done(data => {
      if (data) {
        window.location.href = '#/dash';  
      } else {
        alert('Please, check Username or Password');  
        window.location.href = '#/login';
      }
    }); 
  }

  render() {
    return (
      <div className="container-login">
        <form type="submit" onSubmit={this.handleLogin.bind(this)}>
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

export default Login
