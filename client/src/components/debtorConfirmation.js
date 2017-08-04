import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    debtors: state.final.debtors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const DebtorConfirmation = ({debtors}) => {
  var debtorList = debtors.map((debtor, index) => (
    <div key={index}>
      <div className="row">
        <label className="col-xs-6">Name: </label>
        <p className="col-xs-6">{debtor.name}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Phone: </label>
        <p className="col-xs-6">{debtor.phone}</p>
      </div>
      <p className="boldP">Items</p>
      {
        debtor.items.map((item, index) => (
          <div key={index}>
            <div className="row">
              <label className="col-xs-6">Name: </label>
              <p className="col-xs-6">{item.name}</p>
            </div>
            <div className="row">
              <label className="col-xs-6">Price: </label>
              <p className="col-xs-6">${item.price}</p>
            </div>
          </div>
        ))
      }
      <div className="row">
        <label className="col-xs-6">Items Total: </label>
        <p className="col-xs-6">${debtor.total}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Tax: </label>
        <p className="col-xs-6">${debtor.tax}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Tip: </label>
        <p className="col-xs-6">${debtor.tip}</p>
      </div>
      <div className="row">
        <label className="col-xs-6">Final Total: </label>
        <p className="col-xs-6">${debtor.debtTotal}</p>
      </div>
      <hr />
    </div>
  ));

  var rending = (debtors !== null) ? debtorList : null;

  return (
    <div className="container">
      <hr />
      {rending}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (DebtorConfirmation);