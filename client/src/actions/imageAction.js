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

const imageTax = (tax) => {
  return {
    type: 'IMAGE-TAX',
    payload: tax,
  };
};

const imageTotal = (total) => {
  return {
    type: 'IMAGE-TOTAL',
    payload: total,
  };
};

export {
  imageItems,
  sendItemImageToServer,
  imageDataInfo,
  imageTax,
  imageTotal
};