import React from 'react';
import Sortable from 'sortablejs';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setDebtors,
  setSplitter,
  setSplitTotal,
  setTotalTax,
  setTotalTip,
} from '../actions/finalActions.js';
import { 
  addItem,
  removeItem,
  setItem,
  setTax,
  setTotal,
  setTip,
  setSplitName
} from '../actions/inputActions.js';
import AddFriends from './addFriends.js';
import AddFriendsByUserButton from './addFriendsByUser.js';

const mapStateToProps = state => {
  return {
    items: state.input.items,
    tax: state.input.tax,
    total: state.input.total,
    tip: state.input.tip,
    friendsInfo: state.output.friendsInfo,
    splitterName: state.final.splitter.name,
    splitterNumber: state.final.splitter.phone,
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
  };
};

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.grabListData = this.grabListData.bind(this);
    this.makeSortable = this.makeSortable.bind(this);
    this.splitItem = this.splitItem.bind(this);
  }

  componentDidMount() {
    this.makeSortable();
  }

  componentDidUpdate() {
    this.makeSortable();
  }

  makeSortable() {
    var $sortableLists = $('.sortableList');
    $sortableLists.each((index, list) => {
      Sortable.create(list, {group: 'test'});
    });
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

  grabListData() {
    var debtors = [];

    $('.completedList').each((index, list) => {
      var debtor = {};
      var nameAndPhone = list.id.split(' ');

      debtor.name = this.props.friendsInfo[index].friendName;
      debtor.phone = this.props.friendsInfo[index].friendNumber;
      debtor.email = this.props.friendsInfo[index].friendEmail || null;
      debtor.items = [];

      if (list.children.length > 0) {
        $.each(list.children, (name, obj) => {
          var item = {};
          var itemAndPrice = obj.id.split(' ');
          item.name = itemAndPrice[0];
          item.price = itemAndPrice[1];
          debtor.items.push(item);
        });
      }

      debtor.total = this.calculateTotal(debtor.items);
      debtor.tax = this.splitTax(debtor.total);
      debtor.tip = this.splitTip(debtor.total);
      debtor.debtTotal = Number((debtor.total + debtor.tax + debtor.tip).toFixed(2));
      debtors.push(debtor);
    });

    this.props.setDebtors(debtors);

    var $splitterList = $('.splitterList')[0];
    var splitter = {};
    var nameAndPhone = $splitterList.id.split(' ');

    splitter.name = nameAndPhone[0];
    splitter.phone = nameAndPhone[1];
    splitter.items = [];

    if ($splitterList.children.length > 0) {
      $.each($splitterList.children, (name, obj) => {
        var item = {};
        var itemAndPrice = obj.id.split(' ');
        item.name = itemAndPrice[0];
        item.price = itemAndPrice[1];
        splitter.items.push(item);
      });
    }

    splitter.total = this.calculateTotal(splitter.items);
    splitter.tax = this.splitTax(splitter.total);
    splitter.tip = this.splitTip(splitter.total);
    splitter.debtTotal = Number((splitter.total + splitter.tax + splitter.tip).toFixed(2));

    this.props.setSplitter(splitter);
    this.props.setSplitTotal(Number(this.props.total));
    this.props.setTotalTax(Number(this.props.tax));
    this.props.setTotalTip(Number(this.props.tip));
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
                <div className="row">
                  <h4>Items</h4>
                </div>
                <div className="row sortableList itemsList">
                  {
                    this.props.items.map((item, index) => (
                      <div className="list-group-item" key={index}>
                        {item.item} ${item.price}
                        <button className="splitBtn btn" id={index} onClick={this.splitItem}>
                          Split
                        </button>
                      </div>
                    ))
                  }
                </div>
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
                    <div className="row containerTitle list-group-item">
                      {this.props.splitterName}
                    </div>
                    <div className="row list-group-item sortableList splitterList" id={this.props.splitterName.split(' ')[0] + ' ' + this.props.splitterNumber}>
                    </div>
                  </div>
                </div>
              </div>
              {
                this.props.friendsInfo.map((person, index) => (
                  <div className="row containerDivPadding" key={index}>
                    <div className="col-xs-12">
                      <div className="row containerTitle list-group-item">
                        {person.friendName}
                      </div>
                      <div className="row list-group-item sortableList completedList" id={person.friendName + ' ' + person.friendNumber}>
                      </div>
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
          <Link className="btn btn-primary" to="/confirmation" onClick={this.grabListData}>Done</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);