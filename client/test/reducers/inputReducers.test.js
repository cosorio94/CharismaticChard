import React from 'react';
import { shallow, mount, render } from 'enzyme';
import reducer from '../../src/reducers/inputReducer.js';

describe('actions', () => {
  const intialState = {
    items: [{name: null, price: null}],
    isLoading: false
  };

  it('should return the ititial state', () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });


  it('should update items array', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_ITEMS', payload: [{name: 'test'}]}
      )).toEqual(
      {
        items: [{name: 'test'}],
        isLoading: false
      }
    );
  });

});