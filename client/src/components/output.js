import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';
import AddFriends from './addFriends.js';
import ItemList from './itemList.js';
import FriendsList from './friendsList.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setFriendsInfo, setDebtors } from '../actions/outputActions.js';
import {
  setSplitterItems, 
  setSplitterDebtTotal,
  setTotalTax,
  setTotalTip,
  setSplitterTax,
  setSplitterTip,
  setSplitTotal } from '../actions/finalActions.js';

const mapStateToProps = state => {
  return {
    debtors: state.output.debtors,
    friendsInfo: state.output.friendsInfo,
    splitter: state.final.splitter, 
    total: state.input.total,
    tip: state.input.tip,
    tax: state.input.tax
  };
};


const mapDispatchToProps = dispatch => {
  return {
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
    setSplitTotal: (input) => dispatch(
      setSplitTotal(input)
    ),
    setTotalTax: (input) => dispatch(
      setTotalTax(input)
    ),
    setTotalTip: (input) => dispatch(
      setTotalTip(input)
    ),
    setSplitterTip: (input) => dispatch(
      setSplitterTip(input)
    ),

    setSplitterTax: (input) => dispatch(
      setSplitterTax(input)
    ),
  };
};

let names = []; 
let foodList = []; 

class Output extends React.Component {
  constructor () {
    super();
    this.state = {
      debtors: []
    };
  }

  friendInfo(name, number) {
    let friendInformation = {
      friendName: name,
      friendNumber: number
    };
    let info = this.state.friendsInfo.concat(friendInformation);
    this.setState({
      friendsInfo: info
    });
  }

  collectSplitItemInfo(name, item, price) {
    let numbers = this.props.friendsInfo;
    let number = null;
    numbers.forEach( (person) => {
      if (name === person.friendName) {
        number = person.friendNumber;
      }
    });
    let itemAndPrice = {
      itemName: item,
      itemPrice: price,
      quantity: 1
    };

    let debtor = {
      name: name,
      phone: number,
      items: []
    };

    let debtors = this.state.debtors;
    if (names.indexOf(name) === -1) {
      this.addDebtor(debtor, itemAndPrice);
    } else {
      this.findDebtor(debtors, name, itemAndPrice);
    }
  }


  addFirstDebtor(debtor, itemAndPrice) {
    debtor.items.push(itemAndPrice);
    foodList.push(itemAndPrice.itemName); 
    let debtorInfo = this.state.debtors.concat(debtor);
    this.setState({
      debtors: debtorInfo
    }, this.helperSetState);
  }

  addDebtor(debtor, itemAndPrice) {
    debtor.items.push(itemAndPrice);
    foodList.push(itemAndPrice.itemName); 
    let debtorInfo = this.state.debtors.concat(debtor);
    this.setState({
      debtors: debtorInfo
    }, this.helperSetState);
  }

  findDebtor(debtors, name, itemAndPrice) {
    for (let i = 0; i < debtors.length; i++) {
      if (debtors[i].name === name ) {
        foodList.push(itemAndPrice.itemName); 
        debtors[i].items.push(itemAndPrice);
      } 
      if (foodList.indexOf(itemAndPrice.itemName) !== -1 && debtors[i].name !== name ) {
        var items = debtors[i].items; 
        for (var j = 0; j < items.length; j++ ) {
          if (items[j].itemName === itemAndPrice.itemName ) {
            items.splice(j, 1);
          } 
        }
      }
    }
  }

  helperSetState () {
    let debtors = this.state.debtors;
    for (let i = 0; i < debtors.length; i++) {
      if (names.indexOf(debtors[i].name) === -1) {
        names.push(debtors[i].name); 
      }
    }
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


  submitDebtors() {
    let debtors = this.state.debtors; 
    let debtTotal = []; 
    for (let i = 0; i < debtors.length; i++) {
      let itemPrice = []; 
      for (let j = 0; j < debtors[i].items.length; j++) {
        itemPrice.push( Number(debtors[i].items[j].itemPrice) ); 
      }
      debtTotal.push(itemPrice.reduce((a, b) => a + b) );
      debtors[i]['debtTotal'] = debtTotal[i];
      debtors[i]['tax'] = this.splitTax(debtors[i].debtTotal);
      debtors[i]['tip'] = this.splitTip(debtors[i].debtTotal);
    }
    this.props.setDebtors(debtors); 
    this.splitterInfo(debtors);
  }

  splitterInfo (debtors) {
    let name = this.props.splitter.name.split(' ')[0];
    let phone = this.props.splitter.phone;
    let splitter = null; 
    for ( let i = 0; i < debtors.length; i++) {
      if ( name === debtors[i].name ) {
        splitter = debtors.splice(i, 1);
      }
    }
    this.props.setSplitTotal(this.props.total);
    this.props.setTotalTax(this.props.tax); 
    this.props.setTotalTip(this.props.tip);
    this.props.setSplitterItems(splitter[0].items);
    this.props.setSplitterDebtTotal(splitter[0].debtTotal);
    this.props.setSplitterTax(splitter[0].tax); 
    this.props.setSplitterTip(splitter[0].tip);
    this.props.setDebtors(debtors);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="logo text-center">
              <img src="./assets/splitter-logo.png" className="mx-auto d-block" width="200"/>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <Grid>
            <Row className="show-grid">
              <Col xs={10} md={5}>
                <ItemList collectSplitItemInfo={this.collectSplitItemInfo.bind(this)}/>
              </Col>
              <Col xs={6} md={4}>
                <AddFriends />
                <FriendsList />
              </Col>
              <Col xsHidden md={4} >
              </Col>
            </Row>
          </Grid>
          <footer>
            <hr className="footerHR"/>
            <Link className="btn btn-primary" to="/confirmation" onClick={this.submitDebtors.bind(this)}>Calculate</Link>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Output);