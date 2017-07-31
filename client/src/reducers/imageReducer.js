export default function reducer(state = 
  { 
    imageDataInfo: null, 
    imageItems: [],
    tax: null,
    total: null
  }, action) {
  switch (action.type) {
  case 'IAMGE-DATAINFO': {
    return {...state, imageDataInfo: action.payload};
  }
  case 'IMAGE-ITEMS': {
    return {...state, imageItems: [...state.imageItems, action.payload]};
  }
  case 'TAX': {
    return {...state, tax: action.payload};
  }
  case 'TOTAL': {
    return {...state, total: action.payload};
  }
  default: {
    return state;
  }
  }
}