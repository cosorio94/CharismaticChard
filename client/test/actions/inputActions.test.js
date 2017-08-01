import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as actions from '../../src/actions/inputActions.js';

describe('actions', () => {

  it('should create an action to send items', () => {
    const items = {test: 'item'};
    const expectedAction = {
      type: 'SET_ITEMS',
      payload: items
    };
    expect(actions.setItems(items)).toEqual(expectedAction);
  });

  it('should create an action to send tax', () => {
    const tax = 15;
    const expectedAction = {
      type: 'SET_TAX',
      payload: tax
    };
    expect(actions.setTax(tax)).toEqual(expectedAction);
  });

  it('should create an action to send total', () => {
    const total = 15;
    const expectedAction = {
      type: 'SET_TOTAL',
      payload: total
    };
    expect(actions.setTotal(total)).toEqual(expectedAction);
  });

  it('should create an action to send tip', () => {
    const tip = 15;
    const expectedAction = {
      type: 'SET_TIP',
      payload: tip
    };
    expect(actions.setTip(tip)).toEqual(expectedAction);
  });

});
