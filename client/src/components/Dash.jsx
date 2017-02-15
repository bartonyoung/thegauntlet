import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';
import {Jumbotron, Col, Row, Button, Grid, Nav, NavItem} from 'react-bootstrap';
import actions from '../../redux/actions';
import NavBar from './Nav.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';

class Dash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let outer = this;
    $.get('/api/allChallenges').done(data => {
      data = data.reverse();
      outer.props.dispatch(actions.addChallenge(data));
    });
  }

  render() {
    return (
      <div>
        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout} handleDisply={this.props.handleDisply}/>
        <ChallengeTable dispatch={this.props.dispatch} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Dash);

