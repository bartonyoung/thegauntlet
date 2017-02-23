import React from 'react';
import $ from 'jquery';
import css from '../styles/landing.css';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import NavBar from './Nav.jsx';

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
       // <source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} type="video/mp4"></source>
                  // <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} width="320" height="240" />
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4>{challenge.title}</h4>
                  <video width="220" height="140" controls>
                     <source src="movie.mp4" type="video/mp4"></source>
                  </video>
              </div>;
      });
    } else {
      return gallery.map(challenge =>{
        return <div className="col-md-4">
                <h4>{challenge.title}</h4>
                <img className="response" src="http://totorosociety.com/wp-content/uploads/2015/03/totoro_by_joao_sembe-d3f4l4x.jpg" />
              </div>;
      });
    }

  }

  render() {
    return (
      <div>
         <NavBar auth={this.props.auth} handleLogout={this.props.handleLogout}/>
          <div className="container-fluid text-center main-content">
            <div className='row header'>
                <div className="col-md-12 text-center">
              <h1 id="title">Welcome to The Gauntlet!</h1>
              <div>
                <p className="subtitle">The Gauntlet is a place to test yourself against others!</p>
                <p className="subtitle">Add your own challenge and watch others respond, or one-up another challenger</p>
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
