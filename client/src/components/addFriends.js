import React from 'react';
import { Button, Modal, Table, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import AddFriendsByUserButton from './addFriendsByUser.js';
import { connect } from 'react-redux';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { addDebtor } from '../actions/outputActions.js';

const phoneUtil = PhoneNumberUtil.getInstance();

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo
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
      showModal: false,
      name: null,
      number: null,
      validationState: null,
      isValid: null
    };
  }

  handleAdd(e) {
    e.preventDefault();
    this.saveFriendInfo();
    this.setState({
      name: '',
      number: '',
      validationState: null
    });
    this.toggle();
  }

  handleFailAdd(e) {
    e.preventDefault();
    this.setState({
      validationState: 'error'
    });
  }

  friendName(e) {
    this.setState({
      name: e.target.value
    });
  }

  friendNumber(e) {
    e.target.value = phoneUtil.format(phoneUtil.parse(e.target.value, 'US'), PhoneNumberFormat.NATIONAL);
    this.setState({
      number: e.target.value,
      validationState: null,
      isValid: phoneUtil.isValidNumber(phoneUtil.parse(e.target.value, 'US'))
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
          Add Friends
        </Button>
        <Modal show={this.state.showModal} onHide={this.toggle.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a friend</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.state.isValid ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>
              <FormGroup controlId="formName">
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Friend's Name" onChange={this.friendName.bind(this)}/>
                </Col>
              </FormGroup>
            </Form>
            <Form horizontal onSubmit={this.state.isValid ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>
              <FormGroup controlId="formPhoneNumber" validationState={this.state.validationState}>
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
            <Button bsStyle="primary" onClick={this.state.isValid ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>ADD</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
