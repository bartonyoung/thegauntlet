import React from 'react';

class Challenge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{this.props.users[0]}</h1>
        <h1>{this.props.users[1]}</h1>
        <h1>{this.props.users[2]}</h1>
        <h1>{this.props.users[3]}</h1>
      </div>
    );
  }
};

export default Challenge;


        // {this.props.users.map((user, i) => {
        //   <h3>{user.username}</h3>
        // })}