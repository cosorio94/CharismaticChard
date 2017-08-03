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
  imageDataInfo,
  imageTax,
  imageTotal
};