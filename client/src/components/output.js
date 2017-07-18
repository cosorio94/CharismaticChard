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



var dummyInputBillData= {
  items: [{item: "pizza", price: "$10"}, {item: "salad", price: "$8"}, {item: "sushi", price: "$16"}, {item: "burger", price: "$13"},{item: "cupcake", price: "$5"}],
  total: "$30",
  tip: "$5", 
  tax: "$4"
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

    // get name, item, price, number information 
    // set the given item and price value as itemName and price value 
    let itemAndPrice = { 
      itemName: item, 
      price: price, 
      quantity:1 
    };
    // create debtor data structure 
    // set the given name and number as name and number value 
    let debtor = {
      name: name,
      number: number,
      items:[ ]
    };

    let debtors = this.state.debtors;
    // initialize debtorInfo as null 
    let debtorInfo = null; 
    // if there are no debtors, then push itemsAndPrice object into debtor items array
    if( debtors.length === 0) {
      debtor.items.push(itemAndPrice);
      // concat debtor object to debtors(state) 
      // reassign debtorInfo 
      // don't PUSH, use concat to insert the object into an array
      debtorInfo = this.state.debtors.concat(debtor);
      // change the debtors state to debtorinfo array 
      this.setState({
        debtors: debtorInfo
      }, this.helperSetState);
      // if there are some debtors  
    } else if( debtors.length > 0){ 
      // check global names array if given name doesn't exist in the names array  
      if ( names.indexOf(name) === -1 ){
        // push itemAndPrice object into the debtor item array => create new debtor 
        debtor.items.push(itemAndPrice);
        // reassign the debtorInfo concatting new debtor to store at the debtors array 
        debtorInfo = this.state.debtors.concat(debtor);
        // change the debtors state with new debtorInfo 
        this.setState({
          debtors: debtorInfo
          // as soon as change the state, fire helperSetState function to grab all debtor's name 
        }, this.helperSetState);
      } else {
        // if the debtor already exists, iterate the debtors array  
        for ( let i = 0; i < debtors.length; i++) {
          // find the debtor object 
          if( debtors[i].name === name) {
            // push the new itemAndPrice object into the same debtor item array 
            debtors[i].items.push(itemAndPrice);
          } 
        }
      }
    }
  }

  helperSetState () {
    var debtors = this.state.debtors;
    for (let i = 0; i < debtors.length; i++) {
      // if the debtor doens't exist in the names array 
      if(names.indexOf(debtors[i].name) === -1){
        // push the new debtor's name into the names array 
        names.push(debtors[i].name); 
      }
    }
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
              {console.log('storage:::', this.state.debtors)}
            </Col>
          </Row>
        </Grid>
        <div>
          <Button bsStyle="primary" bsSize="small">Calculate</Button>
        </div>
      </div>
    );
  }
}


export default Output;
