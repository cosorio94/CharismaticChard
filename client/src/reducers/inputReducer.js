export default function reducer(state = 
  {
    items: [{name: null, price: null}],
  }, action) {
  switch (action.type) {
  case 'SET_ITEMS': {
    return {...state, items: action.payload};
  }
  case 'SET_ITEM': {
    return {...state, items: [...state.items.slice(0, action.index)].concat([action.payload], [...state.items.slice(action.index + 1)])};
  }
  case 'ADD_ITEM': {
    return {...state, items: [...state.items].concat([action.payload])};
  }
  case 'REMOVE_ITEM': {
    return {...state, items: [...state.items.slice(0, -1)]};
  }
  default: {
    return state;
  }
  }
}