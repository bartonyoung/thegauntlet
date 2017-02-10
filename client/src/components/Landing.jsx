import React from 'react';

const Landing = () => (
  <div className="landing">
    <div className='username'>
      <h3>h</h3>
      {/*Move this form*/}
      <form encType="multipart/form-data" action="/api/challenge" method="post">
        <input type="text" name="title" placeholder="title"/>
        <input type="text" name="description" placeholder="description"/>
        <input type="text" name="category" placeholder="category"/>
        <input type="file" name="video" />
        <button>Submit</button>
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