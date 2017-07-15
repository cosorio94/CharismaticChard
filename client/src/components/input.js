import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    numbers: state.numbers.numbers
  };
};
//grab user input and display to screen on submit
//dynamically allow for addition of form fields
const Input = ({numbers}) => {
  return (
    <div>
      <h1>Hello Input</h1>
      <p>{numbers}</p>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <h1>Input Receipt Items</h1>
          </Navbar.Brand>
        </Navbar.Header>
        <hr/>
        <Navbar.Collapse>
          <Navbar.Form>
            <FormGroup>
              <FormControl type="text" placeholder="Item Name..." />
              <FormControl type="number" placeholder="Price..." />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(Input);