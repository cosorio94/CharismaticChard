import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as actions from '../../src/actions/testActions.js';

describe('actions', () => {
  it('should create an action to send debtors', () => {
    const expectedAction = {
      type: 'FETCH_TEST_FULILLED',
      payload: 13423
    };
    expect(actions.fetchNumbers(13423)).toEqual(expectedAction);
  });

  it('should create an action to send debtors', () => {
    const numbers = 123235
    const expectedAction = {
      type: 'SET_TEST_NUMBER',
      payload: numbers
    };
    expect(actions.setNumbers(numbers)).toEqual(expectedAction);
  });

});
