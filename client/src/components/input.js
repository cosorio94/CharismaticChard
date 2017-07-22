import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { setIterator, removeIterator, setItems, setTax, setTotal, setTip } from '../actions/inputActions.js';
import { setSplitName } from '../actions/finalActions.js';

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
    setSplitName: (input) => dispatch(
      setSplitName(input)
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
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="logo text-center">
              <img src="./assets/splitter-logo.png" className="mx-auto d-block" width="200"/>
            </div>
          </div>
        </div>
        <hr />
        <div className="container-fluid">
          <div className="inputContainer row formItem">
            <div className="inputItem col-md-4">
              <label className="inputItemBit">Split Name</label>
              <input type="text" className="inputItemBit name form-control" required/>
            </div>
          </div>
          <div className="items">
            {
              this.props.iterator.map((i, key) => (
                <div key={key} className="inputContainer row formItem">
                  <div className="inputItem col-md-6">
                    <label className="inputItemBit">Item</label>
                    <input type="text" className="inputItemBit form-control" required/>
                  </div>
                  <div className="inputItem col-md-6">
                    <label className="inputItemBit">Price</label>
                    <input type="number" className="inputItemBit form-control" required/>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="inputContainer row formItem">
            <div className="inputItem col-md-4">
              <label className="inputItemBit">Tax</label>
              <input type="number" className="inputItemBit tax form-control" required/>
            </div>
            <div className="inputItem col-md-4">
              <label className="inputItemBit">Total</label>
              <input type="number" className="inputItemBit total form-control" required/>
            </div>
            <div className="inputItem col-md-4">
              <label className="inputItemBit">Tip</label>
              <input type="number" className="inputItemBit tip form-control" required/>
            </div>
          </div>
          <div className="inputContainer row formItem">
            <div className="inputItem col-md-4">
              <Button className="btn btn-sm btn-primary" onClick={this.addItem.bind(this)}>Add Items</Button>
            </div>
            <div className="inputItem col-md-4">
              <Button className="btn btn-sm btn-primary" onClick={this.removeItem.bind(this)}>Remove Item</Button>
            </div>
            <footer>
              <hr className="footerHR"/>
              <Link className="btn btn-primary" to="/output" onClick={this.handleSubmit.bind(this)}>Submit</Link>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);