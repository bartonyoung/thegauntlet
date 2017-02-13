import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';
import {Jumbotron, Col, Row, Button, Grid, Nav, NavItem} from 'react-bootstrap';

const Dash = ({challenges, handleSubmitChallenge, dispatch, handleLogout}) => (
  <div>
    <h1>{window.sessionStorage.getItem('key')}</h1>
      <Nav bsStyle="pills">
        <NavItem href="#" onClick={handleLogout} className="pull-right">Logout</NavItem>
      </Nav> 
    <ChallengeTable id="enterChallenge" handleSubmitChallenge={handleSubmitChallenge} dispatch={dispatch} challenges={challenges}/>
  </div>
);

export default Dash;

    // <Button href="#" onClick={handleLogout}>logout</Button>