export default function reducer(state = 
  { 
    imageDataInfo: null, 
    imageItems: [],
    imageTax: null,
    imageTotal: null
  }, action) {
  switch (action.type) {
  case 'IAMGE-DATAINFO': {
    return {...state, imageDataInfo: action.payload};
  }
  case 'IMAGE-ITEMS': {
    return {...state, imageItems: [...state.imageItems, action.payload]};
  }
  case 'IMAGE-TAX': {
    return {...state, imageTax: action.payload};
  }
  case 'IMAGE-TOTAL': {
    return {...state, imageTotal: action.payload};
  }
  default: {
    return state;
  }
  }
}