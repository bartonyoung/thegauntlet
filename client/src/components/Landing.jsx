import React from 'react';
import $ from 'jquery';
import css from '../styles/landing.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Landing extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      auth: this.props.auth
    };
  }
  componentDidMount() {
    let outer = this;
    $.get('/api/allChallenges')
    .then((data) => {
      data.reverse();
      outer.props.dispatch(actions.addChallenge(data));
    });
  }

  handleGallery(type) {
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
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4>{challenge.title}</h4>
                  <video width="320" height="240" controls>
                    <source src="movie.mp4" type="video/mp4"></source>
                  </video>
              </div>;
      });
    } else {
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4>{challenge.title}</h4>
                  <img src="http://cdn.ttgtmedia.com/ITKE/uploads/blogs.dir/58/files/2015/02/challenge-yourself.png" width="300" height="200" alt=""/>
              </div>;
      });
    } 
 
  } 
  handleNav() {
    if (this.state.auth) {
      return <div className="container-fluid">
              <a href="" className="btn" onClick={this.props.handleLogout}>Log out</a>
              <a href="/#/dash" className="btn">Main Page</a>
            </div>;
    } else {
      return <div className="container-fluid">
              <a href="/#/signup" className="btn" onClick={this.props.handleDisplay}>Signup</a>
              <a href="/#/login" className="btn" onClick={this.props.handleDisplay}>Login</a>
              <a href="/#/dash" className="btn">Dashboard</a>
            </div>;
    }
  }
     

  render() {
    return (
      <div className='container'>
         <nav className="nav navbar navbar-fixed">
           {this.handleNav()}
          </nav>  
          <div className="jumbotron container text-center">
            <div className='row'>
              <div className="col-md-12">
                <div className="col-md-12 text-center">
                <h1>Welcome to The Gauntlet!</h1>
                <p>The Gauntlet is a place to test yourself against others!</p>
                <p>Add your own challenge and watch others respond, or one-up another challenger</p>
              </div>
              </div>
            </div>  
          </div>
            <div className="text-center container gallery">
              <h3>Challenges</h3>  
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
