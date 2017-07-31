import React from 'react';
import { shallow, mount, render } from 'enzyme';
import reducer from '../../src/reducers/outputReducer.js';

describe('actions', () => {
  const intialState = {
    checkUser: {},
    debtors: null,
    friendsInfo: []
  };

  it('should return the ititial state', () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });

  it('should update debtors', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_DEBTORS', payload: [{debtor: 'test'}]}
      )).toEqual({
      checkUser: {},
      debtors: [{debtor: 'test'}],
      friendsInfo: []
    });
  });

  it('should update friends info array', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_FRIENDSINFO', payload: {debtor: 'test'}}
      )).toEqual({
      checkUser: {},
      debtors: null,
      friendsInfo: [{debtor: 'test'}]
    });
  });
});
