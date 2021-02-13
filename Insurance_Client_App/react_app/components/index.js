import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { Provider } from 'react-redux';
import configureStore from '../reduxSaga/store';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("content"));