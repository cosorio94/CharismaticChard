const setDebtors = (debtor) => {
  return {
    type: 'SET_DEBTORS',
    payload: debtor,
  };
};


const setFriendsInfo = (friendsInfo) => {
  return {
    type: 'SET_FRIENDSINFO',
    payload: friendsInfo,
  };
};

export {
  setDebtors,
  setFriendsInfo
};