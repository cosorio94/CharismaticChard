import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import AddFriendsByUserButton from './addFriendsByUser.js';

import { connect } from 'react-redux';

import { setFriendsInfo } from '../actions/outputActions.js';

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFriendsInfo: (input) => dispatch(
      setFriendsInfo(input)
    ),
  };
};

export class AddFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: null,
      number: null
    };
  }

  close() {
    this.setState({ showModal: false });
    let friendInformation = {
      friendName: this.state.name,
      friendNumber: this.state.number
    };
    this.props.setFriendsInfo(friendInformation);
  }

  open() {
    this.setState({ showModal: true });
  }

  friendName(e) {
    this.setState({
      name: e.target.value
    });
  }

  friendNumber(e) {
    this.setState({
      number: e.target.value
    });
  }

  render() {
    return (
      <div className="row text-center">
        <div className="col-xs-12">
          <div className="row">
            <Button id="add-friends" bsStyle="primary" bsSize="small" onClick={this.open.bind(this)}>
              Add Friends
            </Button>
          </div>
          <AddFriendsByUserButton />
          <div className="row">
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Add a friend</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal>
                  <FormGroup controlId="formInlineName">
                    <Col componentClass={ControlLabel} sm={2}>
                      Name
                    </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="Friend's Name" onChange={this.friendName.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="formHorizontalNumber">
                    <Col componentClass={ControlLabel} sm={2}>
                      Number
                    </Col>
                    <Col sm={10}>
                      <FormControl type="email" placeholder="xxx-xxx-xxxx" onChange={this.friendNumber.bind(this)}/>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.close.bind(this)}>ADD</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
