
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
import AddImage from './components/addImage.js';
import Input from './components/input.js';
import Output from './components/output.js';
import Confirmation from './components/confirmation.js';

import store from './store.js';

const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div className="mainContainer">
        <div className="bodyContainer">
          <Route exact path="/" component={() => <Home />}/>
          <Route path="/addImage" component={() => <AddImage />}/>
          <Route path="/input" component={() => <Input />}/>
          <Route path="/output" component={() => <Output />}/>
          <Route path="/confirmation" component={() => <Confirmation />}/>
        </div>
      </div>
    </Router>
  </Provider>, 
  target
);
