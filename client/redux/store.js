import { createStore } from 'redux';
import reducer from './reducers';
//add middleware here

const configureStore = (initialState = { users: [] }) => {
  return createStore(reducer, initialState)
}

export default configureStore