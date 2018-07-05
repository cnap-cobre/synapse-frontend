import React from "react";
import ReactDOM from "react-dom";
import App from './App';

import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerReducer } from "./routing/reducer";
import { routerMiddleware } from "./routing/middleware";
import { startListener } from "./routing/listener";
import { push } from "./routing/actions";

// Create the history object
const history = createBrowserHistory();

// Build the root reducer
const rootReducer = combineReducers({
  // ...otherReducers
  router: routerReducer,
});

// Build the middleware
const middleware = routerMiddleware(history);

// Create the store
const store = createStore(rootReducer, {}, applyMiddleware(middleware));

// Start the history listener
startListener(history, store);


// Render the application
const rootElement = document.getElementById("root");
const render = () => ReactDOM.render((
  <App />
), rootElement);

render();