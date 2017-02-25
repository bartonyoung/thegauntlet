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
      cover:undefined
    };
    this.onChallengeClick = this.onChallengeClick.bind(this);
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

  handleSignup(e) {
    e.preventDefault();
    let signup = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      email: this.refs.email.value
    };
    let confirmPassword = this.refs.confirmPassword.value;

    if (signup.password === confirmPassword) {
      $.post('/api/signup', signup)
      .done(data => {
        if (!data) {
          alert('username already exists!');
          this.refs.username.value = '';
          window.location.href = '#/';
        } else {
          window.sessionStorage.setItem('key', data);
          window.sessionStorage.setItem('username', data);
          this.props.handleAuth(() => {
            window.location.href = '#/dash';
          });
        }
      });
    } else {
      this.refs.password.value = '';
      this.refs.confirmPassword.value = '';
      window.location.href = '#/';
      alert('Password does not match...');
    }
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
    } else if(type === 'videos') {
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4 onClick={() => this.onChallengeClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
                <img className="img-landing" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />        
              </div>;
      });
    }else if(type === undefined){
      // return <img id="gauntlet" src="" alt=""/>
     return  <div className="landing-cover-video" >
                <ReactPlayer
                  volume={0} 
                  controls={true} 
                  className="video-cover" 
                  url='https://www.youtube.com/watch?v=ic869w93roI' 
                  playing 
                  width='640'
                  height='360'
                  />
              </div>
    }

  }

  render() {
    return (
      <div>
         <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout}/> 
          <div className="container-fluid text-center main-content landing-cover">
            <div className='row header'>
              <div className="col-md-12 text-center landing-header">
                <div className="col-md-8 text-center landing-header-left">  
                    <h1 className="landing-intro" id="landing-title">Welcome to The Gauntlet!</h1>
                        {this.handleGallery(this.state.cover)}
                  <div className="description">
                    <p>The Gauntlet is a place to test yourself against others!</p>
                    <p>Add your own challenge and watch others respond, or one-up another challenger</p>
                  </div>
               </div>
               <div className="col-md-4 landing-header-right">
                    <form className="landing-register" type="submit" onSubmit={this.handleSignup.bind(this)}>
                      {/*<p id="sign-up">SIGN UP</p>*/}
                      <input type="text" placeholder="What's your Firstname?" required ref="firstname" className=" landing-input pass" />
                      <input type="text" placeholder="What's your Lasttname?" required ref="lastname"className=" landing-input pass" />
                      <input type="text" placeholder="Create a Username" required ref="username" className="landing-input pass" />
                      <input type="email" placeholder="Enter your Email" required ref="email" className="landing-input pass" />
                      <input type="password" placeholder="Create a Password"required ref="password" className="landing-input pass" />
                      <input type="password" placeholder="Confirm Password" ref="confirmPassword" className=" landing-input pass" />
                      <input type="submit" value="Join Gauntlet!" className=" landing-inputButton" />
                    </form>
                </div>
              </div>
              {/*{this.handleGallery(this.state.cover)}*/}
            </div>
          </div>
            <div className="text-center container gallery">
              {/*<h2>CHALLENGES</h2>  */}
                <div className='row'>  
                  {/*{this.handleGallery('videos')}*/}
                </div>
            </div>
            <div className="text-center container gallery">
              {/*<h3>Most Recent Photos</h3>*/}
                <div className='row'>
                  {/*{this.handleGallery()}*/}
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
