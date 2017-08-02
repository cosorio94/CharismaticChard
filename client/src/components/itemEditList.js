import React from 'react';
import { connect } from 'react-redux';

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
  };
};

const ItemEditList = (props) => {
  return (
    <div>
      <div className="inputContainer row formItem">
        <div className="inputItem col-xs-12">
          <label className="inputItemBit">Split Name</label>
          <input type="text" className="inputItemBit name form-control" placeholder="Name..." required/>
        </div>
      </div>
      <div className="items">
        {
          props.items.map((item, index) => (
            <div key={index} className="inputContainer row formItem">
              <div className="inputItem col-xs-6">
                <label className="inputItemBit">Item</label>
                <input type="text" className="inputItemBit form-control" placeholder="Item..." value={item.item} required/>
              </div>
              <div className="inputItem col-xs-6">
                <label className="inputItemBit">Price</label>
                <input type="number" className="inputItemBit form-control" placeholder="Price..." value={Number(item.price)} required/>
              </div>
            </div>
          ))
        }
      </div>
      <div className="inputContainer row formItem">
        <div className="inputItem col-xs-12">
          <label className="inputItemBit">Tax</label>
          <input type="number" className="inputItemBit tax form-control" placeholder="Tax..." value={props.tax} required/>
        </div>
        <div className="inputItem col-xs-12">
          <label className="inputItemBit">Total</label>
          <input type="number" className="inputItemBit total form-control" placeholder="Total..." value={props.total} required/>
        </div>
        <div className="inputItem col-xs-12">
          <label className="inputItemBit">Tip</label>
          <input type="number" className="inputItemBit tip form-control" placeholder="Tip..." value={props.tip} required/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (ItemEditList);