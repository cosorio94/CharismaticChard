import axios from 'axios';

const checkUserAction = (username) => {
  return (dispatch) => {
    axios.get(`/api/check-user/${username}`)
      .then(res => {
        dispatch({type: 'CHECK_USER', payload: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  };
};

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
  checkUserAction,
  setDebtors,
  setFriendsInfo
};
