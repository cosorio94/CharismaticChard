import React from 'react';
import { shallow, mount, render } from 'enzyme';
import reducer from '../../src/reducers/testReducer.js';

describe('actions', () => {
  const intialState =  {
    numbers: 0,
    name: 'kai'
  };

  it('should create an action to send split total', () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });

  it('should update number', () => {
    expect(
      reducer(
        intialState,
        {type: 'FETCH_TEST_FULILLED', payload: 15}
      )).toEqual(
        {
          numbers: 15,
          name: 'kai'
        }
      );
  });

  it('should update number', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_TEST_NUMBER', payload: 15}
      )).toEqual(
        {
          numbers: 15,
          name: 'kai'
        }
      );
  });
});