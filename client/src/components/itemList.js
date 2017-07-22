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
    tip: state.input.total,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const ItemList = ({items, tax, total, tip, collectSplitItemInfo}) => {
  return (
    <Table responsive className="inputTable">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Person</th>
        </tr>
      </thead>
      <tbody>
        { items !== null ? 
          items.map( (item, index) => (
            <ItemEntry collectSplitItemInfo={collectSplitItemInfo} key={index} item={item} />
          )) 
          : null 
        }   
        <tr>
          <td>tip</td>
          <td>{tip}</td>
          <td></td>
        </tr>
        <tr>
          <td>tax</td>
          <td>{tax}</td>
          <td></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>total</th>
          <th>{total}</th>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);