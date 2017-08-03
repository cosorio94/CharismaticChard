import React from 'react';
import { Button, Modal, Table, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { checkUserAction } from '../actions/outputActions.js';
import { addDebtor } from '../actions/outputActions.js';

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo,
    checkUser: state.output.checkUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkUserAction: (input) => dispatch(
      checkUserAction(input)
    ),
    addDebtor: (input) => dispatch(
      addDebtor(input)
    )
  };
};

export class AddFriendsByUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      validationState: null,
      username: null
    };
  }

  handleAdd(e) {
    e.preventDefault();
    this.saveFriendInfo();
    this.setState({
      username: '',
    });
    this.toggle();
  }

  handleFailAdd(e) {
    e.preventDefault();
    this.setState({
      validationState: 'error'
    });
  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
      validationState: null,
    });
    this.props.checkUserAction(e.target.value);
  }

  saveFriendInfo() {
    let debtor = {
      name: this.props.checkUser.display,
      phone: this.props.checkUser.phone,
      email: this.props.checkUser.email,
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
        <Button id="add-friends-by-user" bsStyle="primary" bsSize="small" onClick={this.toggle.bind(this)}>
          Username
        </Button>
        <Modal show={this.state.showModal} onHide={this.toggle.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a friend by Username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.props.checkUser.email === this.state.username ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>
              <FormGroup controlId="formAddFriendByUser" validationState={this.state.validationState}>
                <Col componentClass={ControlLabel} sm={2}>
                  Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Friend's username" onChange={this.handleChange.bind(this)} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.props.checkUser.email === this.state.username ? this.handleAdd.bind(this) : this.handleFailAdd.bind(this)}>ADD</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendsByUser);
