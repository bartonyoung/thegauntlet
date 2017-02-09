import React from 'react';

const Landing = () => (
  <div className="landing">
    <div className='username'>
      <h3>Gauntlet</h3>
      <form encType="multipart/form-data" action="/api/userUpload" method="post">
        <input type="file" name="video" />
        <button>Upload</button>
      </form>
    </div>
    <div>
      <a href='#/signup'>Signup</a>
      <a href='#/login'>Login</a>
    </div>
    <hr/>
  </div>
);

export default Landing;