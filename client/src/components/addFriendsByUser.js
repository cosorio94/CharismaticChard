import React from 'react';
import { Button, Modal, Table, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setFriendsInfo, checkUserAction } from '../actions/outputActions.js';

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
    setFriendsInfo: (input) => dispatch(
      setFriendsInfo(input)
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

  handleChange(e) {
    this.setState({
      username: e.target.value,
      validationState: null,
    });
    this.props.checkUserAction(e.target.value);
  }

  saveFriendInfo() {
    let friendInformation = {
      friendName: this.props.checkUser.display,
      friendNumber: this.props.checkUser.phone,
      friendEmail: this.props.checkUser.email
    };
    this.props.setFriendsInfo(friendInformation);
  }

  toggle() {
    this.setState({
      showModal: !this.state.showModal
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