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
    this.props.dispatch(actions.setCurrentCategory(category));
    if (category === 'LeaderBoard') {
      $.get('/api/ranks').then((rankData)=>{
        outer.props.dispatch(actions.getRanks(rankData)); 
      });
    } else {
      $.get('/api/allchallenges')
        .then(data=>{
          if (category === 'all') {
            data = data.reverse();
          } else if (category === 'recent') {
            data.length < 6 ? data = data.reverse() : data = data.slice(-5).reverse();
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
  }

  render() {
    return (
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
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SideNav);