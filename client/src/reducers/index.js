import { combineReducers } from 'redux';

import numbers from './testReducer.js';
import input from './inputReducer.js';

const reducer = combineReducers({
  numbers,
  input,
});

export default reducer;