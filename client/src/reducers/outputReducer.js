export default function reducer(state = 
  {
    debtors: null
  }, action) {
  switch (action.type) {
  case 'SET_DEBTORS': {
    return {...state, debtors: action.payload};
  }
  default: {
    return state;
  }
  }
}