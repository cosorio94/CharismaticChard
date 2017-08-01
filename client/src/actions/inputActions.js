import axios from 'axios';

const sendItemImageToServer = (items) => {
  return (dispatch) => { 
    axios.post('/api/analyze-image', items)
      .then(res => {
        dispatch({type: 'SET_ITEMS', payload: res.data.items});
        dispatch({type: 'SET_TAX', payload: res.data.tax.price});
        dispatch({type: 'SET_TOTAL', payload: res.data.total.price});
      })
      .catch(err => {
        console.log(err);
      });
  };
};


const setItems = (item) => {
  return {
    type: 'SET_ITEMS',
    payload: item,
  };
};

const setTax = (tax) => {
  return {
    type: 'SET_TAX',
    payload: tax,
  };
};

const setTotal = (total) => {
  return {
    type: 'SET_TOTAL',
    payload: total,
  };
};

const setTip = (tip) => {
  return {
    type: 'SET_TIP',
    payload: tip,
  };
};

export {
  setItems,
  setTax,
  setTotal,
  setTip,
  sendItemImageToServer
};