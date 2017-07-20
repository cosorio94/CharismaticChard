import axios from 'axios';

const sendStateToServer = (split) => {
  axios.post('/api/save-split', {split})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const fetchUserNameAndPhone = () => {
  return (dispatch) => {
    axios.get('/api/profile-info')
      .then(res => {
        dispatch({type: 'SET_SPLITTER_NAME', payload: res.data.display});
        dispatch({type: 'SET_SPLITTER_PHONE', payload: res.data.phone});
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const setSplitTotal = (total) => {
  return {
    actions: 'SET_SPLIT_TOTAL',
    payload: total,
  };
};

const setTotalTax = (tax) => {
  return {
    actions: 'SET_TOTAL_TAX',
    payload: tax,
  };
};

const setTotalTip = (tip) => {
  return {
    actions: 'SET_TOTAL_TIP',
    payload: tip,
  };
};

const setSplitName = (name) => {
  return {
    actions: 'SET_SPLIT_NAME',
    payload: name,
  };
};

const setSplitterName = (name) => {
  return {
    actions: 'SET_SPLITTER_NAME',
    payload: name,
  };
};

const setSplitterPhone = (phone) => {
  return {
    actions: 'SET_SPLITTER_PHONE',
    payload: phone,
  };
};

const setSplitterItems = (items) => {
  return {
    actions: 'SET_SPLITTER_ITEMS',
    payload: items,
  };
};

const setDebtors = (debtors) => {
  return {
    actions: 'SET_DEBTORS',
    payload: debtors,
  };
};

export {
  sendStateToServer,
  fetchUserNameAndPhone,
  setSplitTotal,
  setTotalTax,
  setTotalTip,
  setSplitName,
  setSplitterName,
  setSplitterPhone,
  setSplitterItems,
  setDebtors
};