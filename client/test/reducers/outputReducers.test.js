import React from 'react';
import { shallow, mount, render } from 'enzyme';
import reducer from '../../src/reducers/outputReducer.js';

describe('actions', () => {
  const intialState = {
    checkUser: {},
    debtors: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });

  it('should update checkUser state', () => {
    expect(
      reducer(
        intialState,
        {type: 'CHECK_USER', payload: {username: 'test'}}
      )).toEqual({
      checkUser: {username: 'test'},
      debtors: [],
    });
  });
});
