import React from 'react';

const FriendEntry = ({friendInfo}) => {
  return (
    <tr>
      <td>{friendInfo.friendName}</td>
      <td>{friendInfo.friendNumber}</td>
    </tr>
  );
};

export default FriendEntry;
