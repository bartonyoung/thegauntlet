import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';
import {Jumbotron, Col, Row, Button, Grid, Nav, NavItem} from 'react-bootstrap';

const Dash = ({challenges, handleSubmitChallenge, dispatch, handleLogout}) => (
  <div>
     <Nav bsStyle="pills"> 
     <h1>{window.sessionStorage.getItem('key')}</h1>
        <Button onClick={handleLogout} className="pull-right">Logout</Button>
      </Nav> 
    <ChallengeTable id="enterChallenge" handleSubmitChallenge={handleSubmitChallenge} dispatch={dispatch} challenges={challenges}/>
  </div>
);

export default Dash;