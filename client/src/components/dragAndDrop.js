import React from 'react';
import { connect } from 'react-redux';
import Sortable from 'sortablejs';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import AddFriends from './addFriends.js';
import { 
  setDebtors, 
  setSplitter,
  setSplitTotal,
  setTotalTax,
  setTotalTip,
} from '../actions/finalActions.js';

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
  };
};

class DragAndDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.grabListData = this.grabListData.bind(this);
    this.makeSortable = this.makeSortable.bind(this);
  }

  splitTax(debtorTotal) {
    let percent = debtorTotal / (this.props.total - this.props.tax);
    let debtorTax = this.props.tax * percent;
    debtorTax = Number(debtorTax.toFixed(2));
    return debtorTax;
  };
  
  splitTip(debtorTotal) {
    let percent = debtorTotal / (this.props.total - this.props.tax);
    let debtorTip = this.props.tip * percent;
    debtorTip = Number(debtorTip.toFixed(2));
    return debtorTip;
  };

  calculateTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += Number(item.price);
    });
    return total;
  };

  grabListData() {
    var debtors = [];
    $('.completedList').each((index, list) => {
      var debtor = {};
      var nameAndPhone = list.id.split(' ');
      debtor.name = nameAndPhone[0];
      debtor.phone = nameAndPhone[1];
      debtor.items = [];
      if (list.children.length > 0) {
        $.each(list.children, (name, obj) => {
          var item = {};
          var itemAndPrice = obj.textContent.split('  $');
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
        var itemAndPrice = obj.textContent.split('  $');
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
    this.props.setSplitTotal(this.props.total);
    this.props.setTotalTax(this.props.tax);
    this.props.setTotalTip(this.props.tip);
  }

  makeSortable() {
    var $sortableLists = $('.sortableList');
    $sortableLists.each((index, list) => {
      Sortable.create(list, {group: 'test'});
    });
  }

  componentDidMount() {
    this.makeSortable();
  }

  componentDidUpdate() {
    this.makeSortable();
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="list-group col-xs-6">
              <div className="row">
                <div className="list-group-item boldItemsHeaders containerTitle">
                  <p className="boldItemsHeaders">Items</p>
                </div>
                <div className="sortableList itemsList">
                  {
                    this.props.items.map((item) => (
                      <div className="list-group-item" key={item.id}>
                        {item.item}  ${item.price}
                      </div>
                    ))
                  }
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-4 containerTitle boldItemsHeaders">tax</div>
                    <div className="col-xs-4 containerTitle boldItemsHeaders">total</div>
                    <div className="col-xs-4 containerTitle boldItemsHeaders">tip</div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4">{this.props.tax}</div>
                    <div className="col-xs-4">{this.props.total}</div>
                    <div className="col-xs-4">{this.props.tip}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-6">
              <h4>Friends List</h4>
              <div className="containerDivPadding">
                <div className="containerTitle list-group-item boldItemsHeaders">
                  {this.props.splitterName}
                </div>
                <div className="list-group-item sortableList splitterList" id={this.props.splitterName.split(' ')[0] + ' ' + this.props.splitterNumber}>
                </div>
              </div>
              {
                this.props.friendsInfo.map((person, index) => (
                  <div className="containerDivPadding" key={index}>
                    <div className="containerTitle list-group-item boldItemsHeaders">
                      {person.friendName}
                    </div>
                    <div className="list-group-item sortableList completedList" id={person.friendName + ' ' + person.friendNumber}>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="row">
            <AddFriends />
          </div>
        </div>
        <footer>
          <hr className="footerHR"/>
          <Link className="btn btn-primary" to="/confirmation" onClick={this.grabListData}>Calculate</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);