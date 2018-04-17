import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AgaveFileBrowser from './AgaveFileBrowser';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <AgaveFileBrowser
        username=""
        baseUrl="https://public.agaveapi.co/files/v2/listings/"
        token=""
    />,
    document.getElementById('root')
);

registerServiceWorker();
