import React from 'react';
import $ from 'jquery';
import css from '../styles/landing.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import NavBar from './Nav.jsx';
import { Link } from 'react-router';
import ReactPlayer from 'react-player'

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      coverVideo:false
    };
    this.onChallengeClick = this.onChallengeClick.bind(this);
    this.topVideo;
  }
  componentDidMount() {
    let outer = this;
    $.get('/api/allChallenges')
    .then((data) => {
      data.reverse();
      outer.props.dispatch(actions.getChallenges(data));
    });
  }

  onChallengeClick(challenge) {
    let outer = this;
       window.sessionStorage.setItem('title', challenge.title);
      window.sessionStorage.setItem('id', challenge.id);
      window.sessionStorage.setItem('description', challenge.description);
      window.sessionStorage.setItem('category', challenge.category);
      window.sessionStorage.setItem('filename', challenge.filename);
      window.sessionStorage.setItem('upvotes', challenge.upvotes);
      window.sessionStorage.setItem('views', challenge.views);
      window.sessionStorage.setItem('username', challenge.username);
      window.sessionStorage.removeItem('respTitle');
      window.sessionStorage.removeItem('respId');
      window.sessionStorage.removeItem('respDescription');
      window.sessionStorage.removeItem('respCategory');
      window.sessionStorage.removeItem('respFilename');
      window.sessionStorage.removeItem('respUpvotes');
      window.sessionStorage.removeItem('respViews');
      window.sessionStorage.removeItem('respUsername');
      $.get('/api/profile/' + window.sessionStorage.username).done(user => {
        outer.props.dispatch(actions.addUser(user));
      });
  }

  handleGallery(type) {
    let outer = this;
    let challenges = this.props.challenges;
    let gallery = [];
    let counter = 1;

    for (let i = 0; i < challenges.length; i++) {
      if (counter === 4) {
        break;
      }
      if (challenges[i]) {
        let extension = challenges[i].filename.slice(-3);
        if (type === 'videos') {
          if (extension === 'mp4') {
            gallery.push(challenges[i]);
            counter++;
          }
        } else {
          if (extension !== 'mp4') {
            gallery.push(challenges[i]);
            counter++;
          }
        }
      }
    }
    if (type === 'videos') {
      (function randomIndex(array) {
        let index = Math.floor(Math.random()*Array.length);
         outer.state.coverVideo = array[index];
      })(gallery);
       // <source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} type="video/mp4"></source>
                  // <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} width="320" height="240" />
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4 onClick={() => this.onChallengeClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
                  <video className="video-landing" width="320" height="240" controls>
                     <source src="movie.mp4" type="video/mp4"></source>
                  </video>
              </div>;
      });
    } else {
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4 onClick={() => this.onChallengeClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
                <img className="img-landing" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />        
              </div>;
      });
    }

  }

  render() {
    return (
      <div>
         <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout}/> 
          <div className="container-fluid text-center main-content landing-cover">
            <div className='row header'>
                <div className="col-md-12 text-center">
                  <div className="col-md-4">
                     {/*{<ReactPlayer 
                       volume={0} 
                       controls={true} 
                       className="video-cover" 
                       url='https://www.youtube.com/watch?v=6-dyNQXYgxQ' 
                       playing 
                       width='540'
                       height='260'
                       />}*/}
                  </div>  
                  <h1 id="title">Welcome to The Gauntlet!</h1>
                <div className="description">
                  <p>The Gauntlet is a place to test yourself against others!</p>
                  <p>Add your own challenge and watch others respond, or one-up another challenger</p>
                </div>
              </div>
            </div>
          </div>
            <div className="text-center container gallery">
              <h2>CHALLENGES</h2>  
                <div className='row'>  
                  {this.handleGallery('videos')}
                </div>
            </div>
            <div className="text-center container gallery">
              <h3>Most Recent Photos</h3>
                <div className='row'>
                  {this.handleGallery()}
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Landing);
