import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    debtors: state.output.debtors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

class Confirmation extends React.Component {
  render() {
    console.log(this.props.debtors);
    return (
      <div>
        <div>
          {
            this.props.debtors.map( (debtor, index) => (
              <div key={index}>
                <p>{debtor.name}</p>
                <p>{debtor.phone}</p>
                {
                  debtor.items.map( (item, index) => (
                    <div key={index}>
                      <p>{item.itemName}</p>
                      <p>{item.itemPrice}</p>
                      <p>{item.quantity}</p>
                    </div>
                  ))
                }
                <p>{debtor.tax}</p>
                <p>{debtor.tip}</p>
                <p>{debtor.debtTotal}</p>
                <hr/>
              </div>
            ))
          }
        </div>
        <div>
          <Button bsStyle="primary" bsSize="small">Confirm & Send</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
