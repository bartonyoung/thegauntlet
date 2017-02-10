import React from 'react';
import $ from 'jquery';

class Signup extends React.Component {

  handleSignup(e) {
    e.preventDefault();
    let signup = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };

    $.post('/api/signup', signup)
    .done(data =>
      console.log("signed into...THE GAUNTLET")
    );
  }

  render() {
    return (
      <div className="container-signup">
        <form type="submit" onSubmit={this.handleSignup.bind(this)}>
          <p>Username</p>
          <input type="text" required ref="username" />
          <p>Email</p>
          <input type="email" required ref="email" />
          <p>Password</p>
          <input type="password" required ref="password" />
          <p>Confirm Password</p>
          <input type="password" required ref="confirmPassword" />
          <p>
            <input type="submit" value="Join Gauntlet!" />
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;