import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import FriendEntry from './friendEntry.js';
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
        {  friendsInfo.map( (friendInfo, index) => { return <FriendEntry key={index} friendInfo={friendInfo}/>; })}
      </tbody>
      <tfoot>
      </tfoot>
    </Table>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);