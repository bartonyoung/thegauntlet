import React from 'react';
import $ from 'jquery';
import css from '../styles/landing.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import NavBar from './Nav.jsx';
import { Link } from 'react-router';
import ReactPlayer from 'react-player';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      cover: undefined,
      auth: this.props.auth
    };
  }

  componentDidMount() {
    let outer = this;
    $.get('/api/allChallenges')
    .then((data) => {
      data.reverse();
      outer.props.dispatch(actions.getChallenges(data));
      //console.log('======================================================>',data)
      outer.handleCoverVideo(data);
      
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
          window.sessionStorage.setItem('user_id', data.scott);
          window.sessionStorage.setItem('username', data.username);
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

  handleCoverVideo(array) {
    let outer = this,
      video;
    let gallery = array.filter((item, index) => {
      let ext = item.filename.split('.').pop();
      if (index < 20 && (ext === 'mp4' || ext === 'mov' )) {
        return item;
      }
    });
    
    video = gallery[Math.floor(Math.random() * gallery.length)];
    console.log(video);
    window.sessionStorage.setItem('coverVideoUsername', video.username);
    outer.props.dispatch(actions.setCoverVideo(video.filename));
  }

  handleGallery(type) {
    let outer = this;
    let challenges = this.props.challenges;
    let gallery = [];
    let counter = 1;
    let cover;

    for (let i = 0; i < challenges.length; i++) {
      if (counter === 4) {
        break;
      }
      if (challenges[i]) {
        let extension = challenges[i].filename.slice(-3);
        if (type === 'videos' || type === 'cover') {
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
       // <source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} type="video/mp4"></source>
                  // <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} width="320" height="240" />
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4 onClick={() => this.onChallengeClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
                  <video className="video-landing" width="320" height="240" controls>
                     <source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + gallery[0].filename} type="video/mp4"></source>
                  </video>
              </div>;
      });
    } else if (type === 'videos') {
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4 onClick={() => this.onChallengeClick(challenge)} className="text-center"><Link to={'/challenge'}>{challenge.title}</Link></h4>
                <img className="img-landing" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />
              </div>;
      });
    }
     /*else if (type === 'cover') {
      // return <img id="gauntlet" src="" alt=""/>
      return (
        <div className="landing-cover-video" >
          <ReactPlayer
            volume={0}
            controls={true}
            className="video-cover"
            url='https://www.youtube.com/watch?v=ic869w93roI/https://www.youtube.com/watch?v=ic869w93roI/IMG_0054.mov'
            playing
            width='640'
            height='360'
            />
        </div>
        );
      }*/
  }

  render() {
    return (
      <div>
        <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout}/>
          <div className="container-fluid text-center main-content landing-cover">
            <div className='row header'>
              <div className="col-md-12 text-center landing-header">
                <div className="row">
                  <div className="col-md-9 text-center landing-header-left">
                    <h1 className="landing-intro" id="landing-title">Welcome to The Gauntlet!</h1>
                      {/*<div className="col-md-3 desc text-center">
                      <p id="landing-desc"></p>
                        </div>*/}
                        {/*{this.handleGallery('cover')}*/}
                        <div className="landing-cover-video">
                          {/*<h4 id="today-cover">Today's User's' Video</h4>  */}
                            {/*<ReactPlayer
                              volume={0}
                              controls={true}
                              className="video-cover"
                              url={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/'+this.props.coverVideo}
                              playing
                              width='640'
                              height='<360></360>'
                              />*/}
                          {/*<span>by {window.sessionStorage.getItem('coverVideoUsername')}</span>*/}
                        </div>
                  </div>
                     <div className="col-md-3 landing-header-right">
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
              </div>
                <div className="row">
                  <div className="col-md-12 text-center">
                     <h2>The Gauntlet is a place to test yourself against others !<br/>
                     Add your own challenge and watch others respond, or one-up another challenger</h2>
                  </div>
                    <div className="row col-wrapper">
                      <div className="col-md-4 col">
                        <h4>Create a Challenge</h4>
                          <img id="icon1"
                          src="http://www.neurologyintranslation.com/wp-content/uploads/2011/07/video_icon.png" alt=""/>
                          <p>
                            Upload video of your challenge <br/>
                            to throw down the gauntlet 
                          </p>
                      </div>
                      <div className="col-md-4 col">
                          <h4>respond</h4>
                          <img id="icon2" src="https://cdn4.iconfinder.com/data/icons/seo-accessibility-usability-2-2/256/Interaction_Design-512.png" alt=""/>
                          <p>
                            Browse challenge<br/>
                            Think you can do better?<br/>
                            respond with your own video
                          </p>
                      </div>
                      <div className="col-md-4 col">
                        <h4>Win</h4>
                          <img id="icon3" src="https://cdn4.iconfinder.com/data/icons/sports-and-games-line-circle/614/533_-_Podium-256.png" alt=""/>
                            <p>
                              Earn the most votes<br/>
                              to become the champion.
                            </p>
                      </div>
                    </div>
                </div>
              </div> 
          </div>                  
            {/*<div className="text-center container gallery">
              <h3>Most Recent Photos</h3>}
                <div className='row'>
                  {{this.handleGallery()}}
                </div>
            </div>*/}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Landing);
