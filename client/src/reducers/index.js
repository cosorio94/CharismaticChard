import { combineReducers } from 'redux';

import input from './inputReducer.js';
import output from './outputReducer.js';
import final from './finalReducer.js';
import history from './historyReducer.js';
import image from './imageReducer.js';

const reducer = combineReducers({
  input,
  output,
  final,
  history,
  image
});

export default reducer;