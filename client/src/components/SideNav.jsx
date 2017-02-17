import React from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/actions.js';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.onSideBarClick = this.onSideBarClick.bind(this);
  }
 
  onSideBarClick(category) {
    const outer = this;
    $.get('/api/allchallenges')
      .then(data=>{
        if (category === 'all') {
          data = data;
        } else if (category === 'recent') {
          data.length < 6 ? data = data : data = data.slice(-5).reverse();
        } else if (category === 'popular') {
          data = data.sort((a, b) =>
            b.upvotes - a.upvotes
          );
        } else {
          data = data.filter(challenge => 
            challenge.category === category
          );
        }
        outer.props.dispatch(actions.addChallenge(data));
      });
  }

  render() {
    return (
      <div className="list-group side-nav">
        <button onClick={()=>{ this.onSideBarClick('all'); }} type="button" className="list-group-item">All Challenges</button>
        <button onClick={()=>{ this.onSideBarClick('popular'); }} type="button" className="list-group-item">Most Popular</button>
        <button onClick={()=>{ this.onSideBarClick('recent'); }} type="button" className="list-group-item">Recent</button>
        <button onClick={()=>{ this.onSideBarClick('sports'); }} type="button" className="list-group-item">Sports</button>
        <button onClick={()=>{ this.onSideBarClick('charity'); }} type="button" className="list-group-item">Charity</button>
        <button onClick={()=>{ this.onSideBarClick('fitness'); }} type="button" className="list-group-item">Fitness</button>
        <button onClick={()=>{ this.onSideBarClick('music'); }} type="button" className="list-group-item">Music</button>
        <button onClick={()=>{ this.onSideBarClick('gaming'); }} type="button" className="list-group-item">Gaming</button>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SideNav);