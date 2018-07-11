import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';
import React from "react";
import { render } from "react-dom";
import routes from './routes.json';
import { createBrowserHistory, Router, startListener } from 'redux-json-router';

// Create the history object
const history = createBrowserHistory();

// Create the store
const store = configureStore(history);

// Start the history listener
startListener(history, store);

// Render the application
const rootElement = document.getElementById("root");
render((
    <Provider store={store}>
    <App>
        <Router routes={routes} />
    </App>
    </Provider>
), rootElement);