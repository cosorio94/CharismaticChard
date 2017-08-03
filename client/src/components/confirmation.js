import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFriendsInfo } from '../actions/outputActions.js';
import { sendStateToServer } from '../actions/finalActions.js';
import DebtorConfirmation from './debtorConfirmation.js';
import SplitterConfirmation from './splitterConfirmation.js'

const mapStateToProps = state => {
  return {
    final: state.final,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendStateToServer: (input) => dispatch(
      sendStateToServer(input)
    ),
  };
};

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false 
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
    this.props.sendStateToServer(this.props.final);
  }

  render() {
    return (
      <div>
        <div>
          <h3 className="homeWelcome">Review Items</h3>
          <SplitterConfirmation />
          <DebtorConfirmation />
          <hr />
          <div className="container">
            <div className="row">
              <label className="col-xs-6 boldP">Split Name: </label>
              <p className="col-xs-6">{this.props.final.splitName}</p>
            </div>
            <div className="row">
              <label className="col-xs-6 boldP">Tax: </label>
              <p className="col-xs-6">{(Number(this.props.final.totalTax)).toFixed(2)}</p>
            </div>
            <div className="row">
              <label className="col-xs-6 boldP">Tip: </label>
              <p className="col-xs-6">{(Number(this.props.final.totalTip)).toFixed(2)}</p>
            </div>
            <div className="row">
              <label className="col-xs-6 boldP">Final Total: </label>
              <p className="col-xs-6">{(Number(this.props.final.splitTotal)).toFixed(2)}</p>
            </div>
          </div>
          <div>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title>Text messages have been sent!</Modal.Title>
              </Modal.Body>
              <Modal.Footer>
                <Link className="btn btn-primary" to="/" onClick={this.close.bind(this)}>Close</Link>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <footer>
              <hr className="footerHR"/>
              <Link className="btn btn-primary" to="/dragAndDrop">back</Link>
              <Button onClick={this.open.bind(this)} bsStyle="primary" bsSize="small">Confirm & Send</Button>
            </footer>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);