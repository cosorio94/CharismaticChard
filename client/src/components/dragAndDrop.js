import React from 'react';
import Sortable from 'react-sortablejs';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setDebtors,
  setSplitter,
  setSplitTotal,
  setTotalTax,
  setTotalTip,
  setSplitterItems,
  addDebtor,
  setDebtorItem,
} from '../actions/finalActions.js';
import { 
  addItem,
  removeItem,
  setItem,
  setItems,
  setTax,
  setTotal,
  setTip,
  setSplitName
} from '../actions/inputActions.js';
import AddFriends from './addFriends.js';
import AddFriendsByUserButton from './addFriendsByUser.js';
import SharedGroup from './sortableGroup.js';

const mapStateToProps = state => {
  return {
    items: state.input.items,
    tax: state.input.tax,
    total: state.input.total,
    tip: state.input.tip,
    debtors: state.output.debtors,
    splitterName: state.final.splitter.name,
    splitterNumber: state.final.splitter.phone,
    splitterItems: state.final.splitter.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDebtors: (input) => dispatch(
      setDebtors(input)
    ),
    setSplitter: (input) => dispatch(
      setSplitter(input)
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
    setItem: (input, index) => dispatch(
      setItem(input, index)
    ),
    addItem: (input) => dispatch(
      addItem(input)
    ),
    setSplitterItems: (input) => dispatch(
      setSplitterItems(input)
    ),
    addDebtor: (input) => dispatch(
      addDebtor(input)
    ),
    setDebtorItem: (input) => dispatch(
      setDebtorItem(input)
    ),
  };
};

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.splitItem = this.splitItem.bind(this);
  }

  splitTax(debtorTotal) {
    let percent = debtorTotal / (this.props.total - this.props.tax);
    let debtorTax = this.props.tax * percent;
    debtorTax = Number(debtorTax.toFixed(2));
    return debtorTax;
  }

  splitTip(debtorTotal) {
    let percent = debtorTotal / (this.props.total - this.props.tax);
    let debtorTip = this.props.tip * percent;
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

  splitItem(e) {
    e.preventDefault();
    var index = e.target.id;
    var first = this.props.items.slice()[index];

    first.price = (Number(first.price) / 2).toString();
    var second = {...first};
    second.item = '(2/2) ' + first.item;
    first.item = '(1/2) ' + first.item;

    this.props.setItem(first, index);
    this.props.addItem(second);
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="list-group col-xs-6">
            <div className="row text-center">
              <div className="col-xs-12">
                <SharedGroup 
                  items={this.props.items}
                  setItems={this.props.setItems}
                  splitItem={this.splitItem}
                  header='Items'
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
                  <div className="col-xs-4">{this.props.tax}</div>
                  <div className="col-xs-4">{this.props.total}</div>
                  <div className="col-xs-4">{this.props.tip}</div>
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
                    <SharedGroup 
                      items={this.props.splitterItems}
                      setItems={this.props.setSplitterItems}
                      splitItem={this.splitItem}
                      header={this.props.splitterName}
                      className='list-group-item'
                    />
                  </div>
                </div>
              </div>
              {
                this.props.debtors.map((person, index) => (
                  <SharedGroup 
                    items={this.props.debtors[index].items}
                    setItems={this.props.setDebtorItem}
                    splitItem={this.splitItem}
                    header={person.name}
                    className='itemsList'
                  />
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
          <Link className="btn btn-primary" to="/confirmation" onClick={this.grabListData}>Done</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);