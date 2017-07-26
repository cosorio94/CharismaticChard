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
import Confirmation from './components/confirmation.js';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import MainSidebars from './components/mainSideBar.js';


import store from './store.js';

const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div className="mainContainer">
        <div className="bodyContainer">
          <Navbar className="navbar">
            <MainSidebars />
          </Navbar>
          <Route exact path="/" component={() => <Home />}/>
          <Route path="/input" component={() => <Input />}/>
          <Route path="/output" component={() => <Output />}/>
          <Route path="/confirmation" component={() => <Confirmation />}/>
        </div>
      </div>
    </Router>
  </Provider>, 
  target
);
