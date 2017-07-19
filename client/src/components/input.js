import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import $ from 'jquery';

import { setIterator, removeIterator, setItems, setTax, setTotal, setTip } from '../actions/inputActions.js';

const mapStateToProps = state => {
  return {
    iterator: state.input.iterator,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setIterator: (input) => dispatch(
      setIterator(input)
    ),
    removeIterator: (input) => dispatch(
      removeIterator(input)
    ),
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
  };
};

class Input extends React.Component {
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
        pair.price = $(elem).val();
        items.push(pair);
        $(elem).val('');
        pair = {};
      }
    });
    p.setItems(items);
    p.setTax($('.tax').val());
    $('.tax').val('');
    p.setTotal($('.total').val());
    $('.total').val('');
    p.setTip($('.tip').val());
    $('.tip').val('');
  }

  addItem() {
    var iter = this.props.iterator;
    var next = iter[iter.length - 1] + 1;
    this.props.setIterator(next);
  }

  removeItem() {
    var last = this.props.iterator.length - 1;
    this.props.removeIterator(last);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="items">
          {
            this.props.iterator.map((i, key) => (
              <div key={key} className="inputContainer row formItem">
                <div className="inputItem col-md-6">
                  <label className="inputItemBit">Item</label>
                  <input type="text" className="inputItemBit form-control" />
                </div>
                <div className="inputItem col-md-6">
                  <label className="inputItemBit">Price</label>
                  <input type="text" className="inputItemBit form-control"/>
                </div>
              </div>
            ))
          }
        </div>
        <div className="inputContainer row formItem">
          <div className="inputItem col-md-4">
            <label className="inputItemBit">Tax</label>
            <input type="text" className="inputItemBit tax form-control"/>
          </div>
          <div className="inputItem col-md-4">
            <label className="inputItemBit">Total</label>
            <input type="text" className="inputItemBit total form-control"/>
          </div>
          <div className="inputItem col-md-4">
            <label className="inputItemBit">Tip</label>
            <input type="text" className="inputItemBit tip form-control"/>
          </div>
        </div>
        <div className="inputContainer row formItem">
          <div className="inputItem col-md-4">
            <Button className="btn btn-sm btn-primary" onClick={this.addItem.bind(this)}>Add Items</Button>
          </div>
          <div className="inputItem col-md-4">
            <Button className="btn btn-sm btn-primary" onClick={this.removeItem.bind(this)}>Remove Item</Button>
          </div>
          <div className="inputItem col-md-4">
            <Button className="btn btn-sm btn-success" type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);