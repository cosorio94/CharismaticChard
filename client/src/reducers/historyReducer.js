export default function reducer(state = 
  {
    history: false,
    splitterHistory: null,
    splitterHistoryItem: null
  }, action) {
  switch (action.type) {
  case 'HISTORY': {
    return {...state, history: action.payload};
  }
  case 'SPLITTER-HISTORY': {
    return {...state, splitterHistory: action.payload };
  }
  case 'ITEM-HISTORY': {
    return {...state, splitterHistoryItem: action.payload };
  }
  default: {
    return state;
  }
  }
}