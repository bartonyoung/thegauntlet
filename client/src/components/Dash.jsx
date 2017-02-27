import React from 'react';
import SideNav from './SideNav.jsx';
import actions from '../../redux/actions';
import NavBar from './Nav.jsx';
import $ from 'jquery';
import { connect } from 'react-redux';
import css from '../styles/dash.css';
import ChallengeList from './ChallengeList.jsx';

class Dash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let outer = this;

    if (window.sessionStorage.username) {
      $.get('/api/getLeaders').done(leaders => {
        outer.props.dispatch(actions.getLeaders(leaders.map(leader => parseInt(leader))));
      });
      $.get('/api/profile').done(data => {
        outer.props.dispatch(actions.addUser(data));
      });
      $.get('/api/favorite').done(data => {
        outer.props.dispatch(actions.setFavorites(data));
      });
      $.get('/api/messages/' + window.sessionStorage.user_id).done(messages => {
        outer.props.dispatch(actions.getMessages(messages));
      });
    }
    $.get('/api/ranks').done((rankData)=>{
      outer.props.dispatch(actions.getRanks(rankData));
    });
    $.get('/api/allChallenges').done(challenges => {
      outer.props.dispatch(actions.getChallenges(challenges.reverse()));
    });
  }

  render() {
    return (
      <div>
        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout} editProfile={this.props.editProfile}/>
        <div className="container-fluid main-content">
          <div className="row">
            <div className="col col-md-2">
              <SideNav />
            </div>
              <div className="col col-md-8 col-lg-8">
                <div className="container-fluid">
                  <div className="row">
                    <ChallengeList dispatch={this.props.dispatch} />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};


export default connect(mapStateToProps)(Dash);

