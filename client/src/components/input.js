import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { inputLoading } from '../actions/historyAction.js';
import Loading from './loading';
import { 
  addItem,
  removeItem,
  setItem,
  setSplitName
} from '../actions/inputActions.js';
import {
  setTotalTax,
  setSplitTotal,
  setTotalTip,
} from '../actions/finalActions.js';

const mapStateToProps = state => {
  return {
    items: state.input.items,
    totalTax: state.final.totalTax,
    splitTotal: state.final.splitTotal,
    totalTip: state.final.totalTip,
    isLoading: state.input.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: (input) => dispatch(
      addItem(input)
    ),
    removeItem: () => dispatch(
      removeItem()
    ),
    setItem: (input, index) => dispatch(
      setItem(input, index)
    ),
    setTotalTax: (input) => dispatch(
      setTotalTax(input)
    ),
    setSplitTotal: (input) => dispatch(
      setSplitTotal(input)
    ),
    setTotalTip: (input) => dispatch(
      setTotalTip(input)
    ),
    setSplitName: (input) => dispatch(
      setSplitName(input)
    ),
  };
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeDyna = this.handleChangeDyna.bind(this);
    this.handleChangeTax = this.handleChangeTax.bind(this);
    this.handleChangeTip = this.handleChangeTip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this.props.setSplitTotal(this.calculateTotal());
  }

  handleChangeName(e) {
    e.preventDefault();
    this.props.setSplitName(e.target.value);
  }

  handleChangeDyna(e) {
    e.preventDefault();
    var val = e.target.value;
    var index = e.target.id;
    var obj = {...this.props.items.slice()[index]};
    if (e.target.type === 'number') {
      obj.price = val;
    } else if (e.target.type === 'text') {
      obj.name = val;
    }
    this.props.setItem(obj, Number(index));
  }

  handleChangeTax(e) {
    e.preventDefault();
    this.props.setTotalTax(e.target.value);
  }

  handleChangeTip(e) {
    e.preventDefault();
    this.props.setTotalTip(e.target.value);
  }

  addItem() {
    this.props.addItem({name: '', price: ''});
  }

  removeItem() {
    this.props.removeItem();
  }

  fixItemPrice(item, index) {
    var itemCopy = {...item};
    itemCopy.price = Number(itemCopy.price).toFixed(2);
    this.props.setItem(itemCopy, index);
  }

  fixItemPricesToTwoDigits() {
    this.props.items.forEach((item, index) => {
      this.fixItemPrice(item, index);
    });
  }

  calculateTotal() {
    var total = 0;
    this.props.items.forEach((item, index) => {
      total += Number(item.price);
    });
    total += Number(this.props.totalTax);
    total += Number(this.props.totalTip);
    return total;
  }

  handleSubmit() {
    this.props.setTotalTip((Number(this.props.totalTip)).toFixed(2));
    this.props.setTotalTax((Number(this.props.totalTax)).toFixed(2));
    this.props.setSplitTotal((Number(this.calculateTotal())).toFixed(2));
  }

  render() {
    return !this.props.isLoading ? (
      <div className="container">   
        <div>
          <div className="inputContainer row formItem">
            <div className="inputItem col-xs-12">
              <label className="inputItemBit">Split Name</label>
              <input type="text" className="inputItemBit name form-control" placeholder="Name..." required/>
            </div>
          </div>
          <div className="items">
            {
              this.props.items.map((item, index) => (
                <div key={index} className="inputContainer row formItem">
                  <div className="inputItem col-xs-6">
                    <label className="inputItemBit">Item</label>
                    <input type="text" className="inputItemBit form-control" id={index} placeholder="Item..." value={item.name} onChange={this.handleChangeDyna} required/>
                  </div>
                  <div className="inputItem col-xs-6">
                    <label className="inputItemBit">Price</label>
                    <input type="number" className="inputItemBit form-control" id={index} placeholder="Price..." value={item.price} onChange={this.handleChangeDyna} required/>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="inputContainer row formItem">
            <div className="inputItem col-xs-12">
              <label className="inputItemBit">Tax</label>
              <input type="number" className="inputItemBit tax form-control" placeholder="Tax..." value={this.props.totalTax} onChange={this.handleChangeTax} required/>
            </div>
            <div className="inputItem col-xs-12">
              <label className="inputItemBit">Tip</label>
              <input type="number" className="inputItemBit tip form-control" placeholder="Tip..." value={this.props.totalTip} onChange={this.handleChangeTip} required/>
            </div>
            <div className="inputItem col-xs-12">
              <label className="inputItemBit">Total</label>
              <input type="number" className="inputItemBit total form-control" placeholder="Total..." value={this.props.splitTotal} disabled/>
            </div>
          </div>
        </div>
        <div className="inputContainer row formItem">
          <div className="inputItem col-xs-6">
            <Button className="btn btn-sm btn-primary" onClick={this.addItem.bind(this)}>Add Item</Button>
          </div>
          <div className="inputItem col-xs-6">
            <Button className="btn btn-sm btn-primary" onClick={this.removeItem.bind(this)}>Remove Item</Button>
          </div>
        </div>
        <br />
        <hr className="footerHR"/>
        <footer>
          <Link className="btn btn-primary" to="/">Cancel</Link>
          <Link className="btn btn-primary" to="/dragAndDrop" onClick={this.handleSubmit}>Submit</Link>
        </footer>
      </div>
    ) : (
      <Loading/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);