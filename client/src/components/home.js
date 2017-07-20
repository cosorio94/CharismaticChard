import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';

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
    let input;
    const send = () => {
      this.props.setNumbers(input.value);
      input.value = '';
    };

    const keyDown = event => {
      if (event.key === 'Enter') {
        send();
      }
    };

    return (
      <div>
        <h1>Hello World!</h1>
        <p>{this.props.numbers}</p>
        <p>{this.props.name}</p>
        <Button onClick={this.props.fetchNumbers}>Get Number</Button>
        <br></br>
        Change Number: <input ref={node => { input = node; } } onKeyPress={this.keyDown}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);