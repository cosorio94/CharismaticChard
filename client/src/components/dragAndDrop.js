import React from 'react';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setDebtor,
  setSplitterItems,
  setSplitterTotal,
  setSplitterTax,
  setSplitterTip,
  setSplitterDebtTotal,
} from '../actions/finalActions.js';
import { 
  addItem,
  setItem,
  setItems,
} from '../actions/inputActions.js';
import AddFriends from './addFriends.js';
import AddFriendsByUserButton from './addFriendsByUser.js';
import SharedGroup from './sortableGroup.js';

const mapStateToProps = state => {
  return {
    items: state.input.items,
    totalTax: state.final.totalTax,
    splitTotal: state.final.splitTotal,
    totalTip: state.final.totalTip,
    debtors: state.final.debtors,
    splitterName: state.final.splitter.name,
    splitterNumber: state.final.splitter.phone,
    splitterItems: state.final.splitter.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setItem: (input, index) => dispatch(
      setItem(input, index)
    ),
    addItem: (input) => dispatch(
      addItem(input)
    ),
    setSplitterItems: (input) => dispatch(
      setSplitterItems(input)
    ),
    setItems: (input) => dispatch(
      setItems(input)
    ),
    setDebtor: (input, index) => dispatch(
      setDebtor(input, index)
    ),
    setSplitterTotal: (input) => dispatch(
      setSplitterTotal(input)
    ),
    setSplitterDebtTotal: (input) => dispatch(
      setSplitterDebtTotal(input)
    ),
    setSplitterTax: (input) => dispatch(
      setSplitterTax(input)
    ),
    setSplitterTip: (input) => dispatch(
      setSplitterTip(input)
    ),
  };
};

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.splitItem = this.splitItem.bind(this);
    this.lists = {
      itemsList: this.props.items,
      splitterList: this.props.splitterItems,
      completedList: this.props.debtors
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDebtorItemsChange = this.handleDebtorItemsChange.bind(this);
    this.handleSplitterItemsChange = this.handleSplitterItemsChange.bind(this);
    this.handleUnusedItemsChange = this.handleUnusedItemsChange.bind(this);
  }

  splitItem(e) {
    e.preventDefault();
    var index = e.target.id;
    var first = this.props.items.slice()[index];

    first.price = (Number(first.price) / 2).toString();
    var second = {...first};
    second.name = '(2/2) ' + first.name;
    first.name = '(1/2) ' + first.name;

    this.props.setItem(first, index);
    this.props.addItem(second);
  }

  getItemInfoFromOrder(order) {
    return order.map(data => {
      var splitData = data.split(' ');
      var price = splitData.pop();
      return {
        name: splitData.join(' '),
        price: price
      };
    });
  }

  handleUnusedItemsChange(order) {
    this.props.setItems(this.getItemInfoFromOrder(order));
  }

  handleSplitterItemsChange(order) {
    this.props.setSplitterItems(this.getItemInfoFromOrder(order));
  }

  handleDebtorItemsChange(order, debtorIndex) {
    var debtor = Object.assign({}, this.props.debtors[debtorIndex]);
    debtor.items = this.getItemInfoFromOrder(order);
    this.props.setDebtor(debtor, debtorIndex);
  }

  splitTax(debtorTotal) {
    let percent = debtorTotal / (Number(this.props.splitTotal) - Number(this.props.totalTax));
    let debtorTax = Number(this.props.totalTax) * percent;
    debtorTax = Number(debtorTax.toFixed(2));
    return debtorTax;
  }

  splitTip(debtorTotal) {
    let percent = debtorTotal / (Number(this.props.splitTotal) - Number(this.props.totalTax));
    let debtorTip = Number(this.props.totalTip) * percent;
    debtorTip = Number(debtorTip.toFixed(2));
    return debtorTip;
  }

  calculateTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += Number(item.price);
    });
    return total;
  }

  calculateSplitterTotal() {
    var total = this.calculateTotal(this.props.splitterItems);
    this.props.setSplitterTotal((total).toFixed(2));
    var tax = this.splitTax(total);
    var tip = this.splitTip(total);
    this.props.setSplitterTax((tax).toFixed(2));
    this.props.setSplitterTip((tip).toFixed(2));
    this.props.setSplitterDebtTotal((total + tax + tip).toFixed(2));
  }

  calculateDebtorTotal(debtor, index) {
    var debtor = {...debtor};
    debtor.total = this.calculateTotal((debtor.items).toFixed(2));
    debtor.tax = this.splitTax((debtor.total).toFixed(2));
    debtor.tip = this.splitTip((debtor.total).toFixed(2));
    debtor.debtTotal = (debtor.total + debtor.tax + debtor.tip).toFixed(2);
    this.props.setDebtor(debtor, index);
  }

  calculateDebtorsTotals() {
    this.props.debtors.forEach((debtor, index) => {
      this.calculateDebtorTotal(debtor, index);
    });
  }

  handleSubmit() {
    this.calculateSplitterTotal();
    this.calculateDebtorsTotals();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="list-group col-xs-6">
            <div className="row text-center">
              <div className="col-xs-12">
                <div className="row">
                  <h4>Items</h4>
                </div>
                <SharedGroup 
                  items={this.props.items}
                  onChange={this.handleUnusedItemsChange}
                  splitItem={this.splitItem}
                  className='itemsList'
                />
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-xs-12">
                <div className="row">
                  <div className="col-xs-4 containerTitle">tax</div>
                  <div className="col-xs-4 containerTitle">total</div>
                  <div className="col-xs-4 containerTitle">tip</div>
                  <hr />
                </div>
                <div className="row">
                  <div className="col-xs-4">{(Number(this.props.totalTax)).toFixed(2)}</div>
                  <div className="col-xs-4">{(Number(this.props.splitTotal)).toFixed(2)}</div>
                  <div className="col-xs-4">{(Number(this.props.totalTip)).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-6 text-center">
            <div className="row">
              <h4>Friends List</h4>
            </div>
            <div className="row text-center friendsList">
              <div className="col-xs-12">
                <div className="row containerDivPadding">
                  <div className="col-xs-12">
                    <div className="row">
                      <h4>{this.props.splitterName}</h4>
                    </div>
                    <SharedGroup 
                      items={this.props.splitterItems}
                      onChange={this.handleSplitterItemsChange}
                      splitItem={this.splitItem}
                      className='list-group-item splitterList'
                    />
                  </div>
                </div>
              </div>
              {
                this.props.debtors.map((person, index) => (
                  <div className="row containerDivPadding" key={index}>
                    <div className="col-xs-12">
                      <div className="row">
                        <h4>{person.name}</h4>
                      </div>
                      <SharedGroup 
                        items={this.props.debtors[index].items}
                        onChange={this.handleDebtorItemsChange}
                        splitItem={this.splitItem}
                        className='list-group-item completedList'
                        debtorIndex={index}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
            <br/>
            <div className="row text-center">
              <div className="containerTitle">Add Friends By: </div>
              <div className="col-xs-6">
                <AddFriends />
              </div>
              <div className="col-xs-6">
                <AddFriendsByUserButton />
              </div>
            </div>
          </div>
        </div>
        <footer>
          <hr className="footerHR"/>
          <Link className="btn btn-primary" to="/input">Back</Link>
          <Link className="btn btn-primary" to="/confirmation" onClick={this.handleSubmit}>Done</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);