// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import log from './log';
import categories from './categories';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ router: routerReducer, log, categories })
  );
}
