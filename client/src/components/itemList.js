import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import ItemEntry from './itemEntry.js';



const ItemList = ({dummyInputBillData, friendsInfo, collectSplitItemInfo}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Person</th>
        </tr>
      </thead>
      <tbody>
        { dummyInputBillData.items !== null ? dummyInputBillData.items.map( (item, index) => { return <ItemEntry collectSplitItemInfo={collectSplitItemInfo} friendsInfo={friendsInfo} key={index} item={item} />; }) : null }   
        <tr>
          <td>tip</td>
          <td>{dummyInputBillData.tip}</td>
          <td></td>
        </tr>
        <tr>
          <td>tax</td>
          <td>{dummyInputBillData.tax}</td>
          <td></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>total</th>
          <th>{dummyInputBillData.total}</th>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
};


export default ItemList;

