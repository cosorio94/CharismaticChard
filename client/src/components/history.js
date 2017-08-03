import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/lib/Button';
import { fetchSplitterHistory } from '../actions/historyAction.js';
import Loading from './loading';

const mapStateToProps = state => {
  return {
    history: state.history.splitterHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSplitterHistory: () => dispatch(
      fetchSplitterHistory()
    )
  };
};

class History extends React.Component {

  componentWillMount() {
    this.props.fetchSplitterHistory();
  }

  render() {
    return this.props.history ? (
      <div className="head">
        <h3 className="split-history-title">Split History</h3>
        <div className="history-button">
          <Link className="btn btn-primary" to="/history" >Split History</Link>
          <Link className="btn btn-primary" to="/item">Item History</Link>
        </div>
        <div className="container-fluid">
          { this.props.history.map((data, index) => (
            <div className= "split-history" key={index}>
              <div className="row">
                <label className="col-xs-6">Split Name: </label>
                <p className="col-xs-6">{data.split_name}</p>
              </div>
              <div className="row">
                <label className="col-xs-6">Splitter: </label>
                <p className="col-xs-6">{data.splitter.display}</p>
              </div>
              <div className="row">
                <label className="col-xs-6">Date: </label>
                <p className="col-xs-6">{data.created_at.slice(0, 10)}</p>
              </div>
              <hr className="split-line"/>
              <label>Items:</label>
              {
                data.items.map( (item, index) => (
                  <div key={index}>
                    <div className="row">
                      <label className="col-xs-6">Item Name: </label>
                      <p className="col-xs-6">{item.item_name}</p>
                    </div>
                    <div className="row">
                      <label className="col-xs-6">Price: </label>
                      <p className="col-xs-6">{item.price}</p>
                    </div>
                    <div className="row">
                      <label className="col-xs-6">Debtor: </label>
                      <p className="col-xs-6">{item.debtor.display}</p>
                    </div>
                    <hr className="split-line"/>
                  </div>
                ))
              }
              <div className="row">
                <label className="col-xs-6">Tax: </label>
                <p className="col-xs-6">{data.tax}</p>
              </div>
              <div className="row">
                <label className="col-xs-6">Tip: </label>
                <p className="col-xs-6">{data.tip}</p>
              </div>
              <div className="row">
                <label className="col-xs-6">Total: </label>
                <p className="col-xs-6">{data.total}</p>
              </div>
            </div>
          ))
          } 
        </div>
      </div>
    ) : (
      <Loading/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);