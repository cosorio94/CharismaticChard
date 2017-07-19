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
import { setFriendsInfo, setDebtors } from '../actions/outputActions.js';


var dummyInputBillData= {
  items: [{item: "pizza", price: "$10"}, {item: "salad", price: "$8"}, {item: "sushi", price: "$16"}, {item: "burger", price: "$13"},{item: "cupcake", price: "$5"}],
  total: "$30",
  tip: "$5", 
  tax: "$4"
};




const mapStateToProps = state => {
  return {
    debtors: state.output.debtors,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    setDebtors: (input) => dispatch(
      setDebtors(input)
    ),
  };
};


let names = []; 
// smart container 
// need to access redux 
class Output extends React.Component {

  constructor () {
    super();
    this.state = {
      friendsInfo: [],
      debtorsBasicInfo: [],
      debtors: []
    };
  }

  friendInfo(name, number) {
    let friendInformation = {
      friendName: name,
      friendNumber: number 
    };
    let info= this.state.friendsInfo.concat(friendInformation);
    this.setState({
      friendsInfo: info
    });
  }

  collectSplitItemInfo(name, item, price) {
    let numbers = this.state.friendsInfo;
    let number = null; 
    numbers.forEach( (person) => {
      if( name === person.friendName) {
        number = person.friendNumber;
      }
    });

    let itemAndPrice = { 
      itemName: item, 
      price: price, 
      quantity:1 
    };

    let debtor = {
      name: name,
      number: number,
      items:[ ]
    };

    let debtors = this.state.debtors;
    let debtorInfo = null; 
    if( debtors.length === 0) {
      debtor.items.push(itemAndPrice);
      debtorInfo = this.state.debtors.concat(debtor);
      this.setState({
        debtors: debtorInfo
      }, this.helperSetState);
    } else if( debtors.length > 0){ 
      if ( names.indexOf(name) === -1 ){
        debtor.items.push(itemAndPrice);
        debtorInfo = this.state.debtors.concat(debtor);
        this.setState({
          debtors: debtorInfo
        }, this.helperSetState);
      } else {
        for ( let i = 0; i < debtors.length; i++) {
          if( debtors[i].name === name) {
            debtors[i].items.push(itemAndPrice);
          } 
        }
      }
    }
  }

  helperSetState () {
    var debtors = this.state.debtors;
    for (let i = 0; i < debtors.length; i++) {
      if(names.indexOf(debtors[i].name) === -1){
        names.push(debtors[i].name); 
      }
    }
  }


  submitDebtors() {
    this.props.setDebtors(this.state.debtors);
  }


  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={10} md={5}>
              <ItemList dummyInputBillData={dummyInputBillData} friendsInfo={this.state.friendsInfo} collectSplitItemInfo={this.collectSplitItemInfo.bind(this)}/>
            </Col>
            <Col xs={6} md={4}>
              <AddFriends friendInfo={this.friendInfo.bind(this)}/>
              <FriendsList friendsInfo={this.state.friendsInfo} />
            </Col>
            <Col xsHidden md={4} >
            </Col>
          </Row>
        </Grid>
        <div>
          <Button onClick={this.submitDebtors.bind(this)} bsStyle="primary" bsSize="small">Calculate</Button>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Output);