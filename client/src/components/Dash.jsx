import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';
import {Jumbotron, Col, Row, Button, Grid} from 'react-bootstrap';

const Dash = ({challenges, handleSubmitChallenge, dispatch, handleLogout}) => (
  <div>
    <h1>{window.sessionStorage.getItem('key')}</h1>
    <a href="#" onClick={handleLogout}>logout</a>
    <ChallengeTable dispatch={dispatch} />
  </div>
);

export default Dash;

