import React from 'react';

class Signup extends React.Component {

  render() {
    return(
      <div className="container-signup">
        <form type="submit">
          <p>Username</p>
          <input type="text" required name="username" />
          <p>Email</p>
          <input type="email" required name="email" />
          <p>Password</p>
          <input type="password" required name="password" />
          <p>Confirm Password</p>
          <input type="password" required name="confirmPassword" />
          <p>
            <input type="submit" value="Join Gauntlet!" />
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;