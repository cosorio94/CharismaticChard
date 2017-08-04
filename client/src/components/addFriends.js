import React from 'react';
import { Button, Modal, Table, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import AddFriendsByUserButton from './addFriendsByUser.js';
import { connect } from 'react-redux';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { addDebtor } from '../actions/finalActions.js';

const phoneUtil = PhoneNumberUtil.getInstance();

const mapStateToProps = state => {
  return {
    debtors: state.output.debtors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDebtor: (input) => dispatch(
      addDebtor(input)
    ),
  };
};

export class AddFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isName: false,
      isValidNumber: false,
      name: null,
      number: null,
      showModal: false,
      validationStateName: null,
      validationStateNumber: null
    };
  }

  handleAdd(e) {
    e.preventDefault();
    this.saveFriendInfo();
    this.setState({
      isName: false,
      isValidNumber: false,
      name: null,
      number: null,
      validationStateName: null,
      validationStateNumber: null
    });
    this.toggle();
  }

  handleFailAdd(e) {
    e.preventDefault();
    if (!this.state.isName) {
      this.setState({
        validationStateName: 'error'
      });
    }
    if (!this.state.isValidNumber) {
      this.setState({
        validationStateNumber: 'error'
      });
    }
  }

  friendName(e) {
    this.setState({
      name: e.target.value,
      isName: e.target.value.match(/^[a-z0-9]+$/i),
      validationStateName: null
    });
  }

  friendNumber(e) {
    e.target.value = phoneUtil.format(phoneUtil.parse(e.target.value, 'US'), PhoneNumberFormat.NATIONAL);
    this.setState({
      number: e.target.value,
      isValidNumber: phoneUtil.isValidNumber(phoneUtil.parse(e.target.value, 'US')),
      validationStateNumber: null
    });
  }

  saveFriendInfo() {
    let debtor = {
      name: this.state.name,
      phone: this.state.number,
      email: null,
      email: null,
      total: null,
      tax: null,
      tip: null,
      debtTotal: null,
      items: [],
    };
    this.props.addDebtor(debtor);
  }

  toggle() {
    this.setState({
      showModal: !this.state.showModal,
      validationState: null
    });
  }

  render() {
    return (
      <div className="text-center">
        <Button id="add-friends" bsStyle="primary" bsSize="small" onClick={this.toggle.bind(this)}>
          Phone
        </Button>
        <Modal show={this.state.showModal} onHide={this.toggle.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a friend</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.state.isName && this.state.isValidNumber ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>
              <FormGroup controlId="formName" validationState={this.state.validationStateName}>
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Friend's Name" onChange={this.friendName.bind(this)}/>
                </Col>
              </FormGroup>
            </Form>
            <Form horizontal onSubmit={this.state.isName && this.state.isValidNumber ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>
              <FormGroup controlId="formPhoneNumber" validationState={this.state.validationStateNumber}>
                <Col componentClass={ControlLabel} sm={2}>
                  Number
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="(xxx)xxx-xxxx" onChange={this.friendNumber.bind(this)}/>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.state.isName && this.state.isValidNumber ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>ADD</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
