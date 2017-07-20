import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { connect } from 'react-redux';
import { setFriendsInfo, setDebtors } from '../actions/outputActions.js';


const mapStateToProps = state => {
  return {
    friendsInfo: state.output.friendsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};


class ItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "person",
      item: this.props.item.item,
      price: this.props.item.price
    };
  }

  changeTitle (e) { 
    this.setState({
      name: e.target.title
    }, this.debtor);
  }

  debtor() {
    this.props.collectSplitItemInfo(this.state.name, this.state.item, this.state.price);
  }

  render() {
    return (
      <tr>
        <td>{this.props.item.item}</td>
        <td>{this.props.item.price}</td>
        <td>
          <DropdownButton bsStyle="success" title={this.state.name} id='split-button-basic-Success'>
            {this.props.friendsInfo.map((friendInfo, index) => { return <MenuItem key={index} onClick={this.changeTitle.bind(this) } title={friendInfo.friendName}>{friendInfo.friendName}</MenuItem>; })}
          </DropdownButton>
        </td>
      </tr>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEntry);