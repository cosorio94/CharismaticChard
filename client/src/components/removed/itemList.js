import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import ItemEntry from './itemEntry.js';
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

const ItemList = ({items, tax, total, tip, collectSplitItemInfo}) => {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="row">
          <div className="col-xs-4">Item</div>
          <div className="col-xs-4">Price</div>
          <div className="col-xs-4">Person</div>
        </div>
        <hr />
        {
          items !== null ?
            items.map( (item, index) => (
              <ItemEntry collectSplitItemInfo={collectSplitItemInfo} key={index} item={item} />
            ))
            : null
        }
        <hr />
        <div className="row">
          <div className="col-xs-4">tip</div>
          <div className="col-xs-4">{tip}</div>
          <div className="col-xs-4"></div>
        </div>
        <div className="row">
          <div className="col-xs-4">tax</div>
          <div className="col-xs-4">{tax}</div>
          <div className="col-xs-4"></div>
        </div>
        <div className="row">
          <div className="col-xs-4">total</div>
          <div className="col-xs-4">{total}</div>
          <div className="col-xs-4"></div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);