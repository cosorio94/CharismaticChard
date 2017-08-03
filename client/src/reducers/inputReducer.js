export default function reducer(state = 
  {
    items: [{name: null, price: null}],
    isLoading: false
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
  case 'TOGGLE_ISLOADING': {
    return {...state, isLoading: action.payload};
  }
  default: {
    return state;
  }
  }
}