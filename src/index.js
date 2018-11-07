import "regenerator-runtime/runtime";
import App from './App';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/index';
import { Provider } from 'react-redux';
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory, Router, startListener } from 'redux-json-router';

// Create the history object
const history = createBrowserHistory();

// Create the store
const store = configureStore(history);

// Start the history listener
startListener(history, store);

// Render the application
const rootElement = document.getElementById("root");

const render = Component => {
  ReactDOM.render((
      <Provider store={store}>
        <AppContainer>
          <Component/>
        </AppContainer>
      </Provider>
  ), rootElement);
};

render(App);

if (module.hot) {
    console.log('Is module.hot?  Yes');
    module.hot.accept('./App.js', function() {
        console.log('Accepting the updated app.');
        const x =
        render(require('./App').default);
    });
}