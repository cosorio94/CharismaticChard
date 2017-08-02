import React from 'react';
import Button from 'react-bootstrap/lib/Button';
// import Modal from 'react-bootstrap/lib/Modal';
// import Table from 'react-bootstrap/lib/Table';
// import ItemEntry from './itemEntry.js';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    // items: state.input.items,
    // tax: state.input.tax,
    // total: state.input.total,
    // tip: state.input.tip,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const ImageItemList = () => {
  return (
    <div className="row">

    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItemList);

