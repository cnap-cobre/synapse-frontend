import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import persistState from 'redux-localstorage';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, routerReducer } from 'redux-json-router';

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

  const enhancers = compose(
      middlewareEnhancer,
      monitorReducerEnhancer,
      persistState(['visualOptions'])
  );

  return createStore(
      makeRootReducer(),
      initialState,
      enhancers
  );
}