import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import { setItems, setTax, setTotal, setTip } from '../actions/inputActions.js';
import { setSplitName } from '../actions/finalActions.js';
import { inputLoading } from '../actions/historyAction.js';
import ItemInputList from './itemInputList.js';
import ItemEditList from './itemEditList.js';


const mapStateToProps = state => {
  return {
    items: state.input.items,
    tax: state.input.tax,
    total: state.input.total,
    tip: state.input.tip,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setItems: (input) => dispatch(
      setItems(input)
    ),
    setTax: (input) => dispatch(
      setTax(input)
    ),
    setTotal: (input) => dispatch(
      setTotal(input)
    ),
    setTip: (input) => dispatch(
      setTip(input)
    ),
    setSplitName: (input) => dispatch(
      setSplitName(input)
    ),
  };
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 1,
    };
  }

  addItem() {
    this.setState({
      items: this.state.items + 1
    });
  }

  removeItem() {
    this.setState({
      items: this.state.items - 1
    });
  }

  handleSubmit() {
    var p = this.props;
    var $items = $('.items').find('input');
    var items = [];
    var pair = {};
    $items.each((index, elem) => {
      var keys = Object.keys(pair).length;
      if (keys === 0) {
        pair.item = $(elem).val();
        $(elem).val('');
      } else if (keys === 1) {
        pair.id = index;
        pair.price = $(elem).val();
        items.push(pair);
        $(elem).val('');
        pair = {};
      }
    });
    p.setSplitName($('.name').val());
    $('.name').val('');
    p.setItems(items);
    p.setTax($('.tax').val());
    $('.tax').val('');
    p.setTotal($('.total').val());
    $('.total').val('');
    p.setTip($('.tip').val());
    $('.tip').val('');
  }

  render() {
    var itemList = (this.props.items.length === 0) ? <ItemInputList items={this.state.items}/> : <ItemEditList />;

    return (
      <div className="head">
        <div className="container-fluid">
          {itemList}
          <div className="inputContainer row formItem">
            <div className="inputItem col-md-4">
              <Button className="btn btn-sm btn-primary" onClick={this.addItem.bind(this)}>Add Items</Button>
            </div>
            <div className="inputItem col-md-4">
              <Button className="btn btn-sm btn-primary" onClick={this.removeItem.bind(this)}>Remove Item</Button>
            </div>
            <footer>
              <hr className="footerHR"/>
              <Link className="btn btn-primary" to="/dragAndDrop" onClick={this.handleSubmit.bind(this)}>Submit</Link>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Input);

