import React from 'react';
import ChallengeTable from './ChallengeTable.jsx';
import SideNav from './SideNav.jsx';
import actions from '../../redux/actions';
import NavBar from './Nav.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';
import css from '../styles/dash.css';

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

    $.get('/api/getLeaders').then(leaders => {
      outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
    });

    $.get('/api/profile').done(data => {
      outer.props.dispatch(actions.addUser(data));
    });

    $.get('/api/ranks').then((rankData)=>{
      outer.props.dispatch(actions.getRanks(rankData)); 
    }).then(() => {
      $.get('/api/allchallenges')
        .then(data=>{
          outer.props.dispatch(actions.addChallenge(data));
        });
    }); 
  }

  render() {
    return (
      <div className="container-fluid">
        <center><h4 className="title">The Gauntlet</h4></center>
        <hr />
        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout} editProfile={this.props.editProfile}/>
        <hr />
        <div className="row">
          <div className="col col-md-2">
            <SideNav />
          </div>  
            <ChallengeTable dispatch={this.props.dispatch} />
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};


export default connect(mapStateToProps)(Dash);

