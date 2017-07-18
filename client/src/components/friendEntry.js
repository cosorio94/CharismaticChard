import React from 'react';

// dumb component 
const FriendEntry = ({friendInfo}) => {
  return (
    <tr>
      <td>{friendInfo.friendName}</td>
      <td>{friendInfo.friendNumber}</td>
    </tr>
  );
};

export default FriendEntry;
