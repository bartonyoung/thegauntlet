import React from 'react';

class Signup extends React.Component {

  render() {
    return(
      <div className="container-signup">
        <form type="submit">
          <p>Username</p>
          <input type="text" required ref="username" />
          <p>Email</p>
          <input type="email" required ref="email" />
          <p>Password</p>
          <input type="text" required ref="password" />
          <p>Confirm Password</p>
          <input type="text" required ref="confirmPassword" />
          <p>
            <input type="submit" value="Join Gauntlet!" />
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;