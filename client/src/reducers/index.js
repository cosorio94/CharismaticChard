import { combineReducers } from 'redux';

import numbers from './testReducer.js';
import input from './inputReducer.js';
import output from './outputReducer.js';
import final from './finalReducer.js';

const reducer = combineReducers({
  numbers,
  input,
  output,
  final,
});

export default reducer;