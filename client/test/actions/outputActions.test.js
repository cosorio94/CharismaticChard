import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as actions from '../../src/actions/outputActions.js';
import axios from 'axios';

describe('actions', () => {
  it('should create an axios call when checkUserAction is called', () => {
    axios.get = jest.fn((url) => {
      return Promise.resolve();
    });
    actions.checkUserAction('username')();
    expect(axios.get).toBeCalled();
  });
});
