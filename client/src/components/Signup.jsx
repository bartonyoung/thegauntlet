import React from 'react';
import $ from 'jquery';

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
      <div className="container-signup">
        <form type="submit" onSubmit={this.handleSignup.bind(this)}>
          <p>Firstname</p>
            <input type="text" required ref="firstname" />
          <p>Lastname</p>
            <input type="text" required ref="lastname" />
          <p>Username</p>
            <input type="text" required ref="username" />
          <p>Email</p>
            <input type="email" required ref="email" />
          <p>Password</p>
            <input type="password" required ref="password" />
          <p>Confirm Password</p>
            <input type="password" ref="confirmPassword" />
          <p>
            <input type="submit" value="Join Gauntlet!" />
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;