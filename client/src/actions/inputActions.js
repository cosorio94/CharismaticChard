const setIterator = (item) => {
  return {
    type: 'SET_ITERATOR',
    payload: item,
  };
};

const removeIterator = (last) => {
  return {
    type: 'REMOVE_ITERATOR',
    payload: last,
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
  setIterator,
  removeIterator,
  setItems,
  setTax,
  setTotal,
  setTip
};