import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as actions from '../../src/actions/finalActions.js';
import axios from 'axios';

describe('axios actions', () => {
  it('should return an anon function', async () => {
    expect(actions.sendStateToServer('data')).toBeInstanceOf(Function);
  });

  it('makes a axios post when called', () => {
    axios.post = jest.fn((url) => {
      return Promise.resolve();
    });
    actions.sendStateToServer('fakeSplit')();
    expect(axios.post).toBeCalled();
  });

  it('should return an anon function', () => {
    expect(actions.sendStateToServer('data')).toBeInstanceOf(Function);
  });

});

describe('actions', () => {
  it('should create an action to send split total', () => {
    const total = 15;
    const expectedAction = {
      type: 'SET_SPLIT_TOTAL',
      payload: total
    };
    expect(actions.setSplitTotal(total)).toEqual(expectedAction);
  });

  it('should create an action to send total tax', () => {
    const tax = 15;
    const expectedAction = {
      type: 'SET_TOTAL_TAX',
      payload: tax
    };
    expect(actions.setTotalTax(tax)).toEqual(expectedAction);
  });

  it('should create an action to send total tip', () => {
    const tip = 15;
    const expectedAction = {
      type: 'SET_TOTAL_TIP',
      payload: tip
    };
    expect(actions.setTotalTip(tip)).toEqual(expectedAction);
  });

  it('should create an action to send split name', () => {
    const name = 'testName';
    const expectedAction = {
      type: 'SET_SPLIT_NAME',
      payload: name
    };
    expect(actions.setSplitName(name)).toEqual(expectedAction);
  });

  it('should create an action to send splitter name', () => {
    const name = 'testName';
    const expectedAction = {
      type: 'SET_SPLITTER_NAME',
      payload: name
    };
    expect(actions.setSplitterName(name)).toEqual(expectedAction);
  });

  it('should create an action to send split phone', () => {
    const phone = 9999999999;
    const expectedAction = {
      type: 'SET_SPLITTER_PHONE',
      payload: phone
    };
    expect(actions.setSplitterPhone(phone)).toEqual(expectedAction);
  });

  it('should create an action to send splitter items', () => {
    const items = [{test: 'test'}];
    const expectedAction = {
      type: 'SET_SPLITTER_ITEMS',
      payload: items
    };
    expect(actions.setSplitterItems(items)).toEqual(expectedAction);
  });

  it('should create an action to send debtors', () => {
    const debtors = [{test: 'test'}];
    const expectedAction = {
      type: 'SET_DEBTORS',
      payload: debtors
    };
    expect(actions.setDebtors(debtors)).toEqual(expectedAction);
  });

  it('should create an action to send splitter debt total', () => {
    const debt = 15;
    const expectedAction = {
      type: 'SET_SPLITTER_DEBTTOTAL',
      payload: debt
    };
    expect(actions.setSplitterDebtTotal(debt)).toEqual(expectedAction);
  });

  it('should create an action to send splitter tax', () => {
    const tax = 15;
    const expectedAction = {
      type: 'SET_DEBTORS_TAX',
      payload: tax
    };
    expect(actions.setSplitterTax(tax)).toEqual(expectedAction);
  });

  it('should create an action to send splitter tip', () => {
    const tip = 15;
    const expectedAction = {
      type: 'SET_DEBTORS_TIP',
      payload: tip
    };
    expect(actions.setSplitterTip(tip)).toEqual(expectedAction);
  });

  it('should create an action to send splitter', () => {
    const splitter = {test: 'test'};
    const expectedAction = {
      type: 'SET_SPLITTER',
      payload: splitter
    };
    expect(actions.setSplitter(splitter)).toEqual(expectedAction);
  });

});
