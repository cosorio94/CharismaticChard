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

});
