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

const setItems = (items) => {
  return {
    type: 'SET_ITEMS',
    payload: items,
  };
};

const setItem = (item, index) => {
  return {
    type: 'SET_ITEM',
    payload: item,
    index: index,
  };
};

const addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};

const removeItem = () => {
  return {
    type: 'REMOVE_ITEM',
    payload: undefined,
  };
};

export {
  setItems,
  setItem,
  addItem,
  removeItem,
  sendItemImageToServer
};