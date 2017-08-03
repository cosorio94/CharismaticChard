import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { inputLoading } from '../actions/historyAction.js';
import { 
  addItem,
  removeItem,
  setItem,
  setTax,
  setTotal,
  setTip,
  setSplitName
} from '../actions/inputActions.js';

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
    addItem: (input) => dispatch(
      addItem(input)
    ),
    removeItem: () => dispatch(
      removeItem()
    ),
    setItem: (input, index) => dispatch(
      setItem(input, index)
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
    this.handleChangeDyna = this.handleChangeDyna.bind(this);
    this.handleChangeTax = this.handleChangeTax.bind(this);
    this.handleChangeTotal = this.handleChangeTotal.bind(this);
    this.handleChangeTip = this.handleChangeTip.bind(this);
  }

  handleChangeName(e) {
    e.preventDefault();
    this.props.setSplitName(e.target.value);
  }

  handleChangeDyna(e) {
    e.preventDefault();
    var val = e.target.value;
    var index = e.target.id;
    var obj = this.props.items.slice()[index];
    if (e.target.type === 'number') {
      obj.price = val;
    } else if (e.target.type === 'text') {
      obj.item = val;
    }
    this.props.setItem(obj, index);
  }

  handleChangeTax(e) {
    e.preventDefault();
    this.props.setTax(Number(e.target.value));
  }

  handleChangeTotal(e) {
    e.preventDefault();
    this.props.setTotal(Number(e.target.value));
  }

  handleChangeTip(e) {
    e.preventDefault();
    this.props.setTip(Number(e.target.value));
  }

  addItem() {
    this.props.addItem({item: undefined, price: undefined});
  }

  removeItem() {
    this.props.removeItem();
  }

  render() {
    return (
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
                    <input type="text" className="inputItemBit form-control" id={index} placeholder="Item..." value={item.item} onChange={this.handleChangeDyna} required/>
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
              <input type="number" className="inputItemBit tax form-control" placeholder="Tax..." value={this.props.tax} onChange={this.handleChangeTax} required/>
            </div>
            <div className="inputItem col-xs-12">
              <label className="inputItemBit">Total</label>
              <input type="number" className="inputItemBit total form-control" placeholder="Total..." value={this.props.total} onChange={this.handleChangeTotal} required/>
            </div>
            <div className="inputItem col-xs-12">
              <label className="inputItemBit">Tip</label>
              <input type="number" className="inputItemBit tip form-control" placeholder="Tip..." value={this.props.tip} onChange={this.handleChangeTip} required/>
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
          <Link className="btn btn-primary" to="/dragAndDrop">Submit</Link>
        </footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);