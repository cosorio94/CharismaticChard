import { combineReducers } from 'redux';

import numbers from './testReducer.js';
import input from './inputReducer.js';
import output from './outputReducer.js';
import final from './finalReducer.js';
import history from './historyReducer.js';

const reducer = combineReducers({
  numbers,
  input,
  output,
  final,
  history,
});

export default reducer;