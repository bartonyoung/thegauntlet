import React from 'react';

let whichFavoriteIcon = (store, challengeId) => {
  if (store.favorites.some(challenge => challenge.id === challengeId)) {
    return (
          <button className="btn btn-lg social-button">
            <span className="glyphicon glyphicon-heart" style={{color: 'red'}} onClick={() => { this.removeFromFavorites(challengeId); }}></span>
          </button>
    );
  } else {
    return (
          <button className="btn btn-lg social-button" onClick={() => { this.addToFavorites(challengeId); }}>
            <span className="glyphicon glyphicon-heart"></span>
          </button>
    );
  }
};

let voteButtons = (store, challengeId, upvotes) => {
  if (store.upvoted.includes(challengeId)) {
    return (
      <span>
        <button onClick={() => this.upVoteClick(challengeId)} type="button" className="btn btn-lg social-button" style={{color: 'green'}}>
          <span className="glyphicon glyphicon-arrow-up"></span>
        </button>
        <button className="btn btn-lg social-button">{upvotes}</button>
        <button onClick={() => this.downVoteClick(challengeId)} type="button" className="btn btn-lg social-button">
          <span className="glyphicon glyphicon-arrow-down"></span>
        </button>
      </span>
    );
  } else if (store.downvoted.includes(challengeId)) {
    return (
      <span>
        <button onClick={() => this.upVoteClick(challengeId)} type="button" className="btn btn-lg social-button">
          <span className="glyphicon glyphicon-arrow-up"></span>
        </button>
        <button className="btn btn-lg social-button">{upvotes}</button>
        <button onClick={() => this.downVoteClick(challengeId)} type="button" className="btn btn-lg social-button" style={{color: 'red'}}>
          <span className="glyphicon glyphicon-arrow-down"></span>
        </button>
      </span>
    );
  } else {
    return (
      <span>
        <button onClick={() => this.upVoteClick(challengeId)} type="button" className="btn btn-lg social-button">
          <span className="glyphicon glyphicon-arrow-up"></span>
        </button>
        <button className="btn btn-lg social-button">{upvotes}</button>
        <button onClick={() => this.downVoteClick(challengeId)} type="button" className="btn btn-lg social-button">
          <span className="glyphicon glyphicon-arrow-down"></span>
        </button>
      </span>
    );
  }
};      

let checkFile = (type, challenge) => {
  const fileType = {
    'mp4': 'THIS IS A VIDEO!'
  };
  if (fileType[type]) {
    return (<video className="parentMedia" controls>
      {/*<source src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} type="video/mp4"/>*/}
    </video>);
  } else {
    // return <img src={'https://s3-us-west-1.amazonaws.com/thegauntletbucket421/' + challenge.filename} width="320" height="240" />;
    return <img className="parentMedia" src="http://www.jacksonhole.com/blog/wp-content/uploads/whiteford.jpg" />;
  }
};


let checkForOriginalChallenge = (currentVideoID) => {
  if (parseInt(window.sessionStorage.challengeId) !== currentVideoID) {
    return (
      <button className="button original-back-button" onClick={() => { this.backToOriginalChallenge(window.sessionStorage.challengeId); }}>BACK TO ORIGINAL CHALLENGE</button>
    );
    return <div></div>;
  }
};    

let calculateTime = (seconds) => {
  if (seconds < 60) {
    return Math.floor(seconds) + ' seconds ago';
  } else if (seconds >= 60 && seconds < 3600) {
    if (seconds < 120) {
      return ' 1 minute ago';
    } else {
      return Math.floor(seconds / 60) + ' minutes ago';
    }
  } else if (seconds >= 3600 && seconds < 86400) {
    if (seconds < 7200) {
      return ' 1 hour ago';
    } else {
      return Math.floor(seconds / 3600) + ' hours ago';
    }
  } else if (seconds >= 86400 && seconds < 604800) {
    if (seconds < 172800) {
      return ' 1 day ago';
    } else {
      return Math.floor(seconds / 86400) + ' days ago';
    }
  } else if (seconds >= 2592000 && seconds < 31104000) {
    if (seconds < 5184000) {
      return ' 1 month ago';
    } else {
      return Math.floor(seconds / 2592000) + ' months ago';
    }
  } else {
    if (seconds < 62208000) {
      return ' 1 year ago';
    } else {
      return Math.floor(seconds / 31104000) + ' years ago';
    }
  }
};



export { whichFavoriteIcon, voteButtons, calculateTime, checkFile };