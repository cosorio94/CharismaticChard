export default function reducer(state = 
  {
    history: false,
    splitterHistory: null
  }, action) {
  switch (action.type) {
  case 'HISTORY': {
    return {...state, history: action.payload};
  }
  case 'SPLITTER-HISTORY': {
    return {...state, splitterHistory: action.payload };
  }
  default: {
    return state;
  }
  }
}