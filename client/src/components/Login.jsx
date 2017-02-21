import React from 'react';
import $ from 'jquery';
import css from '../styles/signup.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogin(e) {
    e.preventDefault();
    let login = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };
    $.post('/api/login', login)
    .done(data => {
      if (data) {
        window.sessionStorage.setItem('key', data);
        window.sessionStorage.setItem('username', data);
        this.props.handleAuth(()=> {
          window.location.href = '#/dash';
        });
      } else {
        alert('Please, check Username or Password');
        window.location.href = '#/login';
      }
    });
  }

  render() {
    return (
      <div className="container-signup text-center">
        <form id="signup" type="submit" onSubmit={this.handleLogin.bind(this)}>
         <h1 id="sign-up">SIGN IN</h1> 
          <p>Username</p>
          <input type="text" placeholder="Username" required ref="username" className="input pass" />
          <p>Password</p>
          <input type="password" placeholder="Password" required ref="password" className="input pass" />
          <p>
            <input type="submit" value="Login" className="inputButton" />
          </p>
          <a href="/">Back to main page</a>
        </form>
      </div>
    );
  }
}

export default Login;
