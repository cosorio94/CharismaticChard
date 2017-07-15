import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';

import { fetchNumbers, setNumbers } from '../actions/testActions.js';

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
    )
  };
};

const Home = ({numbers, name, fetchNumbers, setNumbers}) => {
  let input;
  const send = () => {
    console.log(input.value);
    setNumbers(input.value);
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
      <p>{numbers}</p>
      <p>{name}</p>
      <Button onClick={fetchNumbers}>Get Number</Button>
      <br></br>
      Change Number: <input ref={node => { input = node; } } onKeyPress={keyDown}/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);