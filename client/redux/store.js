import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';

let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)

const configureStore = (initialState = { users: [] }) => {
  return finalCreateStore(reducer, initialState)
}

export default configureStore