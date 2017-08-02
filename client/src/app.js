import React from 'react';
import { connect } from 'react-redux';
import browserHistory from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import Home from './components/home.js';
import Input from './components/input.js';
import Confirmation from './components/confirmation.js';
import AddImage from './components/addImage.js';
import History from './components/history.js';
import HistoryItem from './components/historyItem.js';
import Footer from './components/footer.js';
import DragAndDrop from './components/dragAndDrop.js';
import MainSidebars from './components/mainSideBar.js';

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
        <div>
          <div className="nav-bar navbar navbar-default">
            <div className="container">
              <MainSidebars />
            </div>
          </div>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route path="/history" render= {() => this.props.history ? <History /> : <Redirect to='/'/> } />
            <Route path="/item" component={() => <HistoryItem />} />
            <Route path="/addImage" component={() => <AddImage />} />
            <Route path="/dragAndDrop" component={() => <DragAndDrop />} />
            <Route path="/input" component={() => <Input />} />
            <Route path="/confirmation" component={() => <Confirmation />} />
          </Switch>
          <Footer /> 
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);