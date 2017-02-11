import React from 'react';
import { connect } from 'react-redux';
class Challenge extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {
          this.props.challenges.map((challenge, i) => {
            return <li key={i}>{challenge.title + ' ' + challenge.description + ' ' + challenge.category}</li>
          })
        }
      </ul>
    );
  }
};

export default Challenge;


        // {this.props.users.map((user, i) => {
        //   <h3>{user.username}</h3>
        // })}
        // <h1>{this.props.challenges[0]}</h1>
        // <h1>{this.props.challenges[1]}</h1>
        // <h1>{this.props.challenges[2]}</h1>
        // <h1>{this.props.challenges[3]}</h1>