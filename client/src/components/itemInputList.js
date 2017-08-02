import React from 'react';

const ItemInputList = ({items}) => {
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
          [...Array(items)].map((item, index) => (
            <div key={index} className="inputContainer row formItem">
              <div className="inputItem col-xs-6">
                <label className="inputItemBit">Item</label>
                <input type="text" className="inputItemBit form-control" placeholder="Item..." required/>
              </div>
              <div className="inputItem col-xs-6">
                <label className="inputItemBit">Price</label>
                <input type="number" className="inputItemBit form-control" placeholder="Price..." required/>
              </div>
            </div>
          ))
        }
      </div>
      <div className="inputContainer row formItem">
        <div className="inputItem col-xs-12">
          <label className="inputItemBit">Tax</label>
          <input type="number" className="inputItemBit tax form-control" placeholder="Tax..."  required/>
        </div>
        <div className="inputItem col-xs-12">
          <label className="inputItemBit">Total</label>
          <input type="number" className="inputItemBit total form-control" placeholder="Total..." required/>
        </div>
        <div className="inputItem col-xs-12">
          <label className="inputItemBit">Tip</label>
          <input type="number" className="inputItemBit tip form-control" placeholder="Tip..." required/>
        </div>
      </div>
    </div>
  );
};

export default ItemInputList;