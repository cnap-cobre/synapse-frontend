import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import { routerReducer, routerMiddleware } from 'redux-json-router';
import { otherMiddlewares } from './other';
import reducer from './reducers';
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from './middleware/logger';
import thunkMiddleware from 'redux-thunk';

// add `routerReducer` to your root reducer
const makeRootReducer = () => combineReducers({
  ...reducer,
  router: routerReducer
});

export default function configureStore(history, initialState = {}) {
  // add `routerMiddleware` to your middlewares, passing it the history
  // singleton from the app's entry point
  const middlewareEnhancer = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    routerMiddleware(history)
  );

  const enhancers = compose(middlewareEnhancer, monitorReducerEnhancer);

  return createStore(
      makeRootReducer(),
      initialState,
      enhancers
  );
}