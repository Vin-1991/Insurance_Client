import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import BusyIndicator from '../components/utils/busyIndicator';

ReactDOM.render(
    <Fragment>
        <App />
        <BusyIndicator />
    </Fragment>,
    document.getElementById("content"));