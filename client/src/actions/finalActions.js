import axios from 'axios';

const sendStateToServer = (split) => {
  return () => { 
    axios.post('/api/save-split', split)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const fetchUserNameAndPhone = () => {
  return (dispatch) => {
    axios.get('/api/profile-info')
      .then(res => {
        dispatch({type: 'SET_SPLITTER_NAME', payload: res.data.display});
        dispatch({type: 'SET_SPLITTER_PHONE', payload: res.data.phone});
        dispatch({type: 'SET_PROFILEPICTURE', payload: res.data['profile_pic']});
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const setProfilePicture = (pic) => {
  return {
    type: 'SET_PROFILEPICTURE',
    payload: pic
  };
};

const setSplitter = (splitter) => {
  return {
    type: 'SET_SPLITTER',
    payload: splitter,
  };
};

const setSplitTotal = (total) => {
  return {
    type: 'SET_SPLIT_TOTAL',
    payload: total,
  };
};

const setTotalTax = (tax) => {
  return {
    type: 'SET_TOTAL_TAX',
    payload: tax,
  };
};

const setTotalTip = (tip) => {
  return {
    type: 'SET_TOTAL_TIP',
    payload: tip,
  };
};

const setSplitName = (name) => {
  return {
    type: 'SET_SPLIT_NAME',
    payload: name,
  };
};

const setSplitterName = (name) => {
  return {
    type: 'SET_SPLITTER_NAME',
    payload: name,
  };
};

const setSplitterPhone = (phone) => {
  return {
    type: 'SET_SPLITTER_PHONE',
    payload: phone,
  };
};

const setSplitterItems = (items) => {
  return {
    type: 'SET_SPLITTER_ITEMS',
    payload: items,
  };
};

const setDebtors = (debtors) => {
  return {
    type: 'SET_DEBTORS',
    payload: debtors,
  };
};

const setSplitterDebtTotal = (debt) => {
  return {
    type: 'SET_SPLITTER_DEBTTOTAL',
    payload: debt,
  };
};

const setSplitterTotal = (debt) => {
  return {
    type: 'SET_SPLITTER_TOTAL',
    payload: debt,
  };
};

const setSplitterTax = (tax) => {
  return {
    type: 'SET_DEBTORS_TAX',
    payload: tax,
  };
};

const setSplitterTip = (tip) => {
  return {
    type: 'SET_DEBTORS_TIP',
    payload: tip,
  };
};

export {
  sendStateToServer,
  fetchUserNameAndPhone,
  setSplitter,
  setSplitTotal,
  setTotalTax,
  setTotalTip,
  setSplitName,
  setSplitterName,
  setSplitterPhone,
  setSplitterItems,
  setDebtors,
  setSplitterDebtTotal,
  setSplitterTotal,
  setSplitterTax,
  setSplitterTip,
  setProfilePicture
};