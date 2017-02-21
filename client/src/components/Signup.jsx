import React from 'react';
import $ from 'jquery';
import css from '../styles/signup.css';

class Signup extends React.Component {

  handleSignup(e) {
    e.preventDefault();
    let signup = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      email: this.refs.email.value
    };
    let confirmPassword = this.refs.confirmPassword.value;

    if (signup.password === confirmPassword) {
      $.post('/api/signup', signup)
      .done(data => {
        if (!data) {
          alert('username already exists!');
          this.refs.username.value = '';
          window.location.href = '#/signup';
        } else {
          window.sessionStorage.setItem('key', data);
          window.sessionStorage.setItem('username', data);
          this.props.handleAuth(() => {
            window.location.href = '#/dash';
          });
        }
      });
    } else {
      this.refs.password.value = '';
      this.refs.confirmPassword.value = '';
      window.location.href = '#/signup';
      alert('Password does not match...');
    }
  }

  render() {
    return (
      <div className="container-signup" >
          <form id="signup" type="submit" onSubmit={this.handleSignup.bind(this)}>
            <h1 id="sign-up">SIGN UP</h1>
            <p>Firstname</p>
              <input type="text" placeholder="What's your Firstname?" required ref="firstname" className="input pass" />
            <p>Lastname</p>
              <input type="text" placeholder="What's your Lasttname?" required ref="lastname"className="input pass"  />
            <p>Username</p>
              <input type="text" placeholder="Create a Username" required ref="username" className="input pass" />
            <p>Email</p>
              <input type="email" placeholder="Enter your Email" required ref="email" className="input pass" />
            <p>Password</p>
              <input type="password" placeholder="Create a Password"required ref="password" className="input pass" />
            <p>Confirm Password</p>
              <input type="password" placeholder="Confirm Password" ref="confirmPassword" className="input pass" />
            <p>
              <input type="submit" value="Join Gauntlet!" className="inputButton" />
            </p>
            <div className="text-center">
            <a href="/">Back to main page</a>
            </div>
          </form>
      </div>
    );
  }
}

export default Signup;