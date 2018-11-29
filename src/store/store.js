import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import { routerMiddleware, routerReducer } from 'redux-json-router';
import { initSagas } from './rootSaga';
import loggerMiddleware from './loggerMiddleware';
import monitorReducerEnhancer from './monitorReducerEnhancer';
import rootReducer from './rootReducer';

// add `routerReducer` to your root reducer
const makeRootReducer = () => combineReducers({
  ...rootReducer,
  router: routerReducer,
});

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history, initialState = {}) {
  // add `routerMiddleware` to your middlewares, passing it the history
  // singleton from the app's entry point

  const middlewareEnhancer = applyMiddleware(
    loggerMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  );

  const enhancers = compose(
    middlewareEnhancer,
    monitorReducerEnhancer,
    // persistState([])
  );

  const store = createStore(
    makeRootReducer(),
    initialState,
    enhancers,
  );

  initSagas(sagaMiddleware);

  return store;
}
