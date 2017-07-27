import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './app.js';

const target = document.getElementById('root');


ReactDOM.render(<Provider store={store}><App /></Provider>, target);
