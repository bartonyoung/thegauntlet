import React from 'react';
import {connect} from 'react-redux';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.onSideBarClick = this.onSideBarClick.bind(this);
  }
 
  onSideBarClick(category) {
    console.log(category);
  }

  render() {
    return (
      <div className="list-group side-nav">
        <button type="button" className="list-group-item">Most Popular</button>
        <button onClick={()=>{ this.onSideBarClick('Recent'); }} type="button" className="list-group-item">Recent</button>
        <button onClick={()=>{ this.onSideBarClick('Sports'); }} type="button" className="list-group-item">Sports</button>
        <button onClick={()=>{ this.onSideBarClick('Charity'); }}type="button" className="list-group-item">Charity</button>
        <button type="button" className="list-group-item">Fitness</button>
        <button type="button" className="list-group-item">Music</button>
        <button type="button" className="list-group-item">Gaming</button>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SideNav);