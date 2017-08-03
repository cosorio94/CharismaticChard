import React from 'react';
import { shallow, mount, render } from 'enzyme';
import reducer from '../../src/reducers/inputReducer.js';

describe('actions', () => {
  const intialState = {
    items: [{item: undefined, price: undefined}],
    tax: null, 
    total: null, 
    tip: null
  };

  it('should return the ititial state', () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });


  it('should update items array', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_ITEMS', payload: [{item: 'test'}]}
      )).toEqual(
      {
        items: [{item: 'test'}],
        tax: null, 
        total: null, 
        tip: null
      }
    );
  });

  it('should update tax', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_TAX', payload: 15}
      )).toEqual(
      {
        items: [{item: undefined, price: undefined}],
        tax: 15, 
        total: null, 
        tip: null
      }
    );
  });

  it('should update total', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_TOTAL', payload: 15}
      )).toEqual(
      {
        items: [{item: undefined, price: undefined}],
        tax: null, 
        total: 15, 
        tip: null
      }
    );
  });

  it('should update total', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_TIP', payload: 15}
      )).toEqual(
      {
        items: [{item: undefined, price: undefined}],
        tax: null, 
        total: null, 
        tip: 15
      }
    );
  });

});