import { combineReducers } from 'redux';

import input from './inputReducer.js';
import output from './outputReducer.js';
import final from './finalReducer.js';
import history from './historyReducer.js';

const reducer = combineReducers({
  input,
  output,
  final,
  history,
});

export default reducer;