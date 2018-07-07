import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { createBrowserHistory, startListener, Router } from 'redux-json-router';
import configureStore from './store';
import routes from './routes.json';

import App from './App';

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