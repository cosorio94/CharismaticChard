import { combineReducers } from 'redux';

import numbers from './testReducer.js';
import input from './inputReducer.js';
import output from './outputReducer.js';

const reducer = combineReducers({
  numbers,
  input,
  output,
});

export default reducer;