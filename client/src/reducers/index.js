import { combineReducers } from 'redux';
import { combineForms, modelReducer } from 'react-redux-form';

import numbers from './testReducer.js';
import input from './inputReducer.js';

const reducer = combineReducers({
  numbers,
  input,
});

export default reducer;