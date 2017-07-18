export default function reducer(state = 
  {
    iterator: [1, 2, 3, 4],
    items: [],
    tax: null, 
    total: null, 
    tip: null
  }, action) {
  switch (action.type) {
  case 'SET_ITERATOR': {
    return {...state, iterator: [...state.iterator, action.payload]};
  }
  case 'SET_ITEMS': {
    return {...state, items: action.payload};
  }
  case 'SET_TAX': {
    return {...state, tax: action.payload};
  }
  case 'SET_TOTAL': {
    return {...state, total: action.payload};
  }
  case 'SET_TIP': {
    return {...state, tip: action.payload};
  }
  default: {
    return state;
  }
  }
}