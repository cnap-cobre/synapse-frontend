import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import persistState from 'redux-localstorage';
import reducer from './reducers';
import {registerWithMiddleware} from './sagas/';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
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
  const sagaMiddleware = createSagaMiddleware();

  const middlewareEnhancer = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    sagaMiddleware,
    routerMiddleware(history)
  );

  const enhancers = compose(
      middlewareEnhancer,
      monitorReducerEnhancer,
      persistState(['visualOptions'])
  );

  const store = createStore(
      makeRootReducer(),
      initialState,
      enhancers
  );

  registerWithMiddleware(sagaMiddleware);

  return store;
}