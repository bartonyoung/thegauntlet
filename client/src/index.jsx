import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>GAUNTLET BITCHES</h1>
        <h2>Gauntletssss</h2>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));