import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
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

const FriendsList = ({friendsInfo}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Friend</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        { 
          friendsInfo.map( (friendInfo, index) => ( 
            <tr key={index}>
              <td>{friendInfo.friendName}</td>
              <td>{friendInfo.friendNumber}</td>
            </tr>
          ))
        }
      </tbody>
      <tfoot>
      </tfoot>
    </Table>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);