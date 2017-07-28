import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';


const mapStateToProps = state => {
  return {
    item: state.history.splitterHistoryItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};


class SplitterHistoryItem extends React.Component {
  render() {
    return (
      <div className="head">
        <h3 className="homeWelcome">Item History</h3>
        <div className="history-button">
          <Link className="btn btn-primary" to="/history" >Split History</Link>
          <Link className="btn btn-primary" to="/item">Item History</Link>
        </div>
        <div className="container-fluid">
          { this.props.item.reverse().slice(0, 10).map((data, index) => (
            <div className= "split-history" key={index}>
              <div className="row">
                <label className="col-xs-6">Item: </label>
                <p className="col-xs-6">{data.item_name}</p>
              </div>
              <div className="row">
                <label className="col-xs-6">Price: </label>
                <p className="col-xs-6">{data.price}</p>
              </div>
            </div>
          ))
          }  
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitterHistoryItem);


