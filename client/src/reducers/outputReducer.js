export default function reducer(state = 
  {
    debtors: []
  }, action) {
  switch (action.type) {
  case 'SET_DEBTORS': {
    return {...state, debtors: [...state.debtors, action.payload]};
  }
  default: {
    return state;
  }
  }
}