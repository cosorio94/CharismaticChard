import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import browserHistory from 'react-router';

import Home from './components/home.js';
import Input from './components/input.js';
import Output from './components/output.js';
import store from './store.js';

const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div className="mainContainer">
        <div className="headerContainer">
          <div className="dropdown headerItem">
            <p>Menu</p>
            <div className="dropdown-content" alt="Menu">
              <Link to="/">Home</Link>
              <Link to="/input">Input</Link>
              <Link to="/output">Output</Link>
            </div>
          </div>
          <div className="logo headerItem">
            <img src="./assets/splitter-logo.png" width="200"/>
          </div>
          <hr/>
        </div>
        <div className="bodyContainer">
          <Route exact path="/" component={() => <Home />}/>
          <Route path="/input" component={() => <Input />}/>
          <Route path="/output" component={() => <Output />}/>
        </div>
      </div>
    </Router>
  </Provider>, 
  target
);
