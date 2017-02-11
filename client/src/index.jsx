import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import configureStore from '../redux/store';
import { Provider } from 'react-redux';

let initialState = {
  challenges: [
                {
                  title: 'pushups',
                  description: 'pushup challenge breh',
                  category: 'fitness',
                  filename: '...'
                },
                {
                  title: 'coding',
                  description: 'master all the algorithms bruh',
                  category: 'programming',
                  filename: 'git --rebase -f'
                }
              ]
};

let store = configureStore(initialState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);