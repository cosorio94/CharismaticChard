import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import $ from 'jquery';

import { setIterator, setItems, setTax, setTotal, setTip } from '../actions/inputActions.js';

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

  render() {
    return (
      <div>
        <div className="items">
          {
            this.props.iterator.map((i, key) => (
              <div className="inputContainer formItem">
                <div className="inputItem">
                  <label className="inputItemBit">Item</label>
                  <input type="text" key={key} className="inputItemBit" />
                </div>
                <div className="inputItem">
                  <label className="inputItemBit">Price</label>
                  <input type="text" key={key + 1} className="inputItemBit"/>
                </div>
              </div>
            ))
          }
        </div>
        <div className="inputContainer formItem">
          <div className="inputItem">
            <label className="inputItemBit">Tax</label>
            <input type="text" className="inputItemBit tax"/>
          </div>
          <div className="inputItem">
            <label className="inputItemBit">Total</label>
            <input type="text" className="inputItemBit total"/>
          </div>
          <div className="inputItem">
            <label className="inputItemBit">Tip</label>
            <input type="text" className="inputItemBit tip"/>
          </div>
        </div>
        <div className="inputContainer formItem">
          <div className="inputItem">
            <Button onClick={this.addItem.bind(this)}>Add Items</Button>
          </div>
          <div className="inputItem">
            <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);