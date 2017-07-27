import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import browserHistory from 'react-router';
import store from './store.js';
import Home from './components/home.js';
import Input from './components/input.js';
import Output from './components/output.js';
import Confirmation from './components/confirmation.js';
import AddImage from './components/addImage.js';
import History from './components/history.js';

import Navbar from 'react-bootstrap/lib/Navbar';
import MainSidebars from './components/mainSideBar.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    history: state.history.history,
    input: state.history.input
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};


class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div className="mainContainer">
          <div className="bodyContainer">
            <Navbar className="navbar">
              <MainSidebars />
            </Navbar>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route path="/history" render= {() => this.props.history ? <History /> : <Redirect to='/'/> } />
              <Route path="/addImage" component={() => <AddImage />} />
              <Route path="/input" component={() => <Input />} />
              <Route path="/output" component={() => <Output />} />
              <Route path="/confirmation" component={() => <Confirmation />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

