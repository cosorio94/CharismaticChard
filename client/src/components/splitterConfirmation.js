import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    splitter: state.final.splitter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const SplitterConfirmation = ({splitter}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <label className="col-xs-6">Name: </label>
        <p className="col-xs-6">{splitter.name}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Phone: </label>
        <p className="col-xs-6">{splitter.phone}</p>
      </div>
      <p className="boldP">Items</p>
      {
        splitter.items.map((item, index) => (
          <div key={index}>
            <div className="row">
              <label className="col-xs-6">Name: </label>
              <p className="col-xs-6">{item.name}</p>
            </div>
            <div className="row">
              <label className="col-xs-6">Price: </label>
              <p className="col-xs-6">{item.price}</p>
            </div>
          </div>
        ))
      }
      <div className="row">
        <label className="col-xs-6">Items Total: </label>
        <p className="col-xs-6">{splitter.total}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Tax: </label>
        <p className="col-xs-6">{splitter.tax}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Tip: </label>
        <p className="col-xs-6">{splitter.tip}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Final Total: </label>
        <p className="col-xs-6">{splitter.debtTotal}</p>
      </div>
      <hr/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (SplitterConfirmation);