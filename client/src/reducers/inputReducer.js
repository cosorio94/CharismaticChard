export default function reducer(state = 
  {
    items: [{item: undefined, price: undefined}],
    tax: null, 
    total: null, 
    tip: null
  }, action) {
  switch (action.type) {
  case 'SET_ITEMS': {
    return {...state, items: action.payload};
  }
  case 'SET_ITEM': {
    return {...state, items: [...state.items.slice(0, action.index)].concat([action.payload], [...state.items.slice(action.index + 1)])}
  }
  case 'ADD_ITEM': {
    return {...state, items: [...state.items].concat([action.payload])};
  }
  case 'REMOVE_ITEM': {
    return {...state, items: [...state.items.slice(0, -1)]};
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