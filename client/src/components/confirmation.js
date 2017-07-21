import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import axios from 'axios';
import { setFriendsInfo } from '../actions/outputActions.js';
import { 
  sendStateToServer,
  fetchUserNameAndPhone,
  setSplitTotal,
  setTotalTax,
  setTotalTip,
  setSplitName,
  setSplitterItems,
  setDebtors,
  setSplitterDebtTotal,
  setSplitterTax,
  setSplitterTip } from '../actions/finalActions.js';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo,
    debtors: state.output.debtors,
    tax: state.input.tax,
    total: state.input.total,
    tip: state.input.tip,
    splitter: state.final.splitter, 
    splitName: state.final.splitName,
    final: state.final
  };
};


const mapDispatchToProps = dispatch => {
  return {
    setSplitTotal: (input) => dispatch(
      setSplitTotal(input)
    ),
    setTotalTax: (input) => dispatch(
      setTotalTax(input)
    ),
    setTotalTip: (input) => dispatch(
      setTotalTip(input)
    ),
    
    setSplitName: (input) => dispatch(
      setSplitName(input)
    ),
    
    setSplitterTip: (input) => dispatch(
      setSplitterTip(input)
    ),

    setSplitterTax: (input) => dispatch(
      setSplitterTax(input)
    ),
    setDebtors: (input) => dispatch(
      setDebtors(input)
    ),
    setFriendsInfo: (input) => dispatch(
      setFriendsInfo(input)
    ),
    setSplitterItems: (input) => dispatch(
      setSplitterItems(input)
    ),
    setSplitterDebtTotal: (input) => dispatch(
      setSplitterDebtTotal(input)
    ),
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

  calculateTax() {
    //iterate over debtors array reducing debtor totals to get total item sum
    //subtract sum of items from total
    //return that number
  }

  splitTax(debtorTotal) {
    let percent = debtorTotal / this.props.total;
    let debtorTax = this.props.tax * percent;
    debtorTax = String(debtorTax).split('').slice(0, 5).join('');
    return Number(debtorTax);
  }

  splitTip(debtorTotal) {
    let percent = debtorTotal / this.props.total;
    let debtorTip = this.props.tip * percent;
    debtorTip = String(debtorTip).split('').slice(0, 5).join('');
    return Number(debtorTip);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
    this.debtors(); 
  }

  debtors () {
    let debtors = this.props.debtors; 
    debtors.forEach((debtor) => {
      debtor.tax = this.splitTax(debtor.debtTotal); 
      debtor.tip = this.splitTip(debtor.debtTotal);
    }); 
    this.splitterInfo(); 
  }



  splitterInfo () {
    let name = this.props.splitter.name.split(' ')[0];
    let phone = this.props.splitter.phone;
    let debtors = this.props.debtors; 
    var splitter = null; 
    for ( let i = 0; i < debtors.length; i++) {
      if ( name === debtors[i].name ) {
        splitter = debtors.splice(i, 1);
      }
    }

    let splitterData = {
      name: name,
      phone: phone,
      debtTotal: splitter[0].debtTotal,
      items: splitter[0].items,
      tax: splitter[0].tax,
      tip: splitter[0].tip
    };

    // this.props.(splitterData.name); 
    // this.props.setSplitterPhone(splitterData.phone); 

    this.props.setSplitTotal(this.props.total); 
    this.props.setTotalTax(this.props.tax); 
    this.props.setTotalTip(this.props.tip); 
    this.props.setSplitterItems(splitter[0].items); 
    this.props.setSplitterDebtTotal(splitter[0].debtTotal); 
    this.props.setSplitterTax(splitter[0].items); 
    this.props.setSplitterTip(splitter[0].tip);
    this.props.setDebtors(debtors); 

    // console.log('this.propsfinal??!!!!!', this.props.final);
    // this.props.sendStateToServer(this.props.final);

    // setTimeout(function(){ 
    //   console.log("this",this); 
    //   console.log('this.props???', this.props); 
    //   // console.log('after', this.props.final)
    // }, 10000);

    // console.log('after SETTIMEOUT', this.props.final);

    // this.props.sendStateToServer(finalDataStrcture);
    // console.log('splitterData',splitterData); 
    this.dataStructure(splitterData, debtors);

  }



  dataStructure (splitterData, debtors) {
    let finalDataStrcture = {
      splitTotal: this.props.total,
      totalTax: this.props.tax,
      totalTip: this.props.tip, 
      splitName: this.props.splitName, 
      splitter: splitterData,
      debtors: debtors
    };


    console.log('finalDataStrcture', finalDataStrcture);
    this.props.sendStateToServer(finalDataStrcture);



    // this.props.setSplitTotal(this.props.total); 
    // this.props.setTotalTax(this.props.tax); 
    // this.props.setTotalTip(this.props.tip); 
    // this.props.setSplitName(this.props.splitName); 
    // console.log('FINALLLLLLL******', this.props.final);
    // this.postRequest();
  }
  
  // postRequest() {
  //   this.props.sendStateToServer(this.props.final);
  // }





  render() {
    return (
      <div>
        <h1>Review Items</h1>
        <div className="container-fluid">
          {
            this.props.debtors !== null ? this.props.debtors.map( (debtor, index) => (
              <div key={index}>
                <div className="row">
                  <label className="col-xs-6">Name: </label>
                  <p className="col-xs-6">{debtor.name}</p>
                </div>
                <div className="row">
                  <label className="col-xs-6">Phone: </label>
                  <p className="col-xs-6">{debtor.number}</p>
                </div>
                <label>Items: </label>
                {
                  debtor.items.map( (item, index) => (
                    <div key={index}>
                      <div className="row">
                        <label className="col-xs-6">Name: </label>
                        <p className="col-xs-6">{item.itemName}</p>
                      </div>
                      <div className="row">
                        <label className="col-xs-6">Price: </label>
                        <p className="col-xs-6">{item.itemPrice}</p>
                      </div>
                      <div className="row">
                        <label className="col-xs-6">Quantity: </label>
                        <p className="col-xs-6">{item.quantity}</p>
                      </div>
                    </div>
                  ))
                }
                <div className="row">
                  <label className="col-xs-6">Tax: </label>
                  <p className="col-xs-6">{this.splitTax(debtor.debtTotal)}</p>
                </div>
                <div className="row">
                  <label className="col-xs-6">Tip: </label>
                  <p className="col-xs-6">{this.splitTip(debtor.debtTotal)}</p>
                </div>
                <div className="row">
                  <label className="col-xs-6">Total: </label>
                  <p className="col-xs-6">{debtor.debtTotal}</p>
                </div>
                <hr/>
              </div>
            ))
              : null
          }
        </div>
        <div>
          <Button onClick={this.open.bind(this)} bsStyle="primary" bsSize="small">Confirm & Send</Button>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Modal.Title>Text messages have been sent!</Modal.Title>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
