import React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions.js';
import css from '../styles/sideNav.css';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.onSideBarClick = this.onSideBarClick.bind(this);
    this.challengeSearch = this.challengeSearch.bind(this);
  }

  onSideBarClick(category) {
    const outer = this;
    this.props.dispatch(actions.setCurrentCategory(category));
    if (category === 'LeaderBoard') {
      $.get('/api/ranks').then((rankData) => {
        let users = rankData.filter(person =>person.upvotes > 0);
        outer.props.dispatch(actions.getRanks(users));
      });
    } else {
      $.get('/api/allchallenges').done(data => {
        if (category === 'all') {
          data = data.reverse();
        } else if (category === 'recent') {
          data.length < 6 ? data = data.reverse() : data = data.slice(-5).reverse();
        } else if (category === 'popular') {
          data = data.sort((a, b) => b.upvotes - a.upvotes);
        } else {
          data = data.filter(challenge => challenge.category === category);
        }
        outer.props.dispatch(actions.getChallenges(data));
      });
    }
  }

  challengeSearch () {
    const outer = this;
    console.log('is this working?');
    $.get('/api/challengeSearch', {search: outer.refs.search.value})
    .then(data => {
      outer.props.dispatch(actions.getChallenges(data));
      outer.refs.search.value = '';
    });
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" required ref="search" placeholder="Search"/>
          <button type="button" onClick={() => this.challengeSearch()}>
            <span className="glyphicon glyphicon-search"></span>
          </button>
        </form>
        <div className="list-group side-nav">
          <button onClick={()=>{ this.onSideBarClick('all'); }} type="button" className="list-group-item">All Challenges</button>
          <button onClick={()=>{ this.onSideBarClick('popular'); }} type="button" className="list-group-item">Most Popular</button>
          <button onClick={()=>{ this.onSideBarClick('recent'); }} type="button" className="list-group-item">Recent</button>
          <button onClick={()=>{ this.onSideBarClick('Sports'); }} type="button" className="list-group-item">Sports</button>
          <button onClick={()=>{ this.onSideBarClick('Charity'); }} type="button" className="list-group-item">Charity</button>
          <button onClick={()=>{ this.onSideBarClick('Fitness'); }} type="button" className="list-group-item">Fitness</button>
          <button onClick={()=>{ this.onSideBarClick('Music'); }} type="button" className="list-group-item">Music</button>
          <button onClick={()=>{ this.onSideBarClick('Gaming'); }} type="button" className="list-group-item">Gaming</button>
          <button onClick={()=>{ this.onSideBarClick('LeaderBoard'); }} type="button" className="list-group-item">LeaderBoard</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SideNav);