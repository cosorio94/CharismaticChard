export default function reducer(state = 
  {
    splitTotal: null,
    totalTax: null,
    totalTip: null,
    splitName: null,
    splitter: {
      name: '',
      phone: '',
      items: [],
      total: null,
      tax: null,
      tip: null,
      debtTotal: null,
    },
    debtors: [],
    picture: null
  }, action) {
  switch (action.type) {
  case 'SET_PROFILEPICTURE': {
    return {...state, picture: action.payload};
  }
  case 'SET_SPLIT_TOTAL': {
    return {...state, splitTotal: action.payload};
  }
  case 'SET_TOTAL_TAX': {
    return {...state, totalTax: action.payload};
  }
  case 'SET_TOTAL_TIP': {
    return {...state, totalTip: action.payload};
  }
  case 'SET_SPLIT_NAME': {
    return {...state, splitName: action.payload};
  }
  case 'SET_SPLITTER_NAME': {
    return {...state, splitter: {...state.splitter, name: action.payload}};
  }
  case 'SET_SPLITTER_PHONE': {
    return {...state, splitter: {...state.splitter, phone: action.payload}};
  }
  case 'SET_SPLITTER_ITEMS': {
    return {...state, splitter: {...state.splitter, items: action.payload}};
  }
  case 'SET_SPLITTER_DEBTTOTAL': {
    return {...state, splitter: {...state.splitter, debtTotal: action.payload}};
  }
  case 'SET_SPLITTER_TOTAL': {
    return {...state, splitter: {...state.splitter, total: action.payload}};
  }
  case 'SET_DEBTORS_TAX': {
    return {...state, splitter: {...state.splitter, tax: action.payload}};
  }
  case 'SET_DEBTORS_TIP': {
    return {...state, splitter: {...state.splitter, tip: action.payload}};
  }
  case 'SET_DEBTORS': {
    return {...state, debtors: action.payload};
  }
  case 'ADD_DEBTOR': {
    return {...state, debtors: [...state.debtors].concat([action.payload])};
  }
  case 'SET_DEBTOR_ITEM': {
    return {...state, debtors: [...state.debtors.slice(0, action.index)].concat([action.payload], [...state.debtors.slice(action.index + 1)])};
  }
  case 'SET_SPLITTER': {
    return {...state, splitter: action.payload};
  }
  default: {
    return state;
  }
  }
}