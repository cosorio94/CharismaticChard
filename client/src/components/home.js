import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';


import { fetchNumbers, setNumbers } from '../actions/testActions.js';
import { fetchUserNameAndPhone } from '../actions/finalActions.js';

const mapStateToProps = state => {
  return {
    numbers: state.numbers.numbers,
    name: state.numbers.name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchNumbers: () => dispatch(
      fetchNumbers()
    ),
    setNumbers: (numbers) => dispatch(
      setNumbers(numbers)
    ),
    fetchUserNameAndPhone: () => dispatch(
      fetchUserNameAndPhone()
    ),
  };
};

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchUserNameAndPhone();
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="homeLogoDiv text-center">
              <img src="./assets/splitter-logo.png" className="homeLogo mx-auto d-block" />
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-center">
          <h4 className="homeWelcome">Welcome To Splitter</h4>
          <hr className="homeHR"/>
        </div>
        <div className="text-center">
          <Link className="homeSplitButton btn" to="/input">Split</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);