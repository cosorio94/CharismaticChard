import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as actions from '../../src/actions/outputActions.js';

describe('actions', () => {
  it('should create an action to send debtors', () => {
    const debtors = [{person: 'debt'}];
    const expectedAction = {
      type: 'SET_DEBTORS',
      payload: debtors
    };
    expect(actions.setDebtors(debtors)).toEqual(expectedAction);
  });

  it('should create an action to send iterator', () => {
    const friendList = [{person: 'debt'}];
    const expectedAction = {
      type: 'SET_FRIENDSINFO',
      payload: friendList
    };
    expect(actions.setFriendsInfo(friendList)).toEqual(expectedAction);
  });

});
