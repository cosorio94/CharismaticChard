import axios from 'axios';

const sendItemImageToServer = (items) => {
  return () => { 
    axios.post('/api/analyze-image', items)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const imageItems = (itemPos) => {
  return {
    type: 'IMAGE-ITEMS',
    payload: itemPos,
  };
};

const imageDataInfo = (image) => {
  return {
    type: 'IAMGE-DATAINFO',
    payload: image,
  };
};

const tax = (tax) => {
  return {
    type: 'TAX',
    payload: tax,
  };
};

const total = (total) => {
  return {
    type: 'TOTAL',
    payload: total,
  };
};

export {
  imageItems,
  sendItemImageToServer,
  imageDataInfo,
  tax,
  total
};