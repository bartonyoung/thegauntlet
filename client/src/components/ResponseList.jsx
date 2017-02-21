import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions.js';
import $ from 'jquery';
import css from '../styles/response.css';
import { Link } from 'react-router';
import ResponseComponent from './ResponseComponent.jsx';

class ResponseList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="response container">
        {this.props.responses.map((response, i) =>
          <ResponseComponent response={response} />
        )}
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ResponseList);