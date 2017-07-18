import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Table from 'react-bootstrap/lib/Table';
import FriendEntry from './friendEntry.js';

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
        { friendsInfo !== null ? friendsInfo.map( (friendInfo, index) => { return <FriendEntry key={index} friendInfo={friendInfo}/>; }) : null }
      </tbody>
      <tfoot>
      </tfoot>
    </Table>
  );
};


export default FriendsList;

