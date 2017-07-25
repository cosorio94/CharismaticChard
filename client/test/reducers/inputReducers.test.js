import React from 'react';
import { shallow, mount, render } from 'enzyme';
import reducer from '../../src/reducers/inputReducer.js';

describe('actions', () => {
  const intialState = {
    iterator: [1],
    items: [],
    tax: null, 
    total: null, 
    tip: null
  };

  it('should return the ititial state', () => {
    expect(reducer(undefined, {})).toEqual(intialState);
  });

  it('should update iterator array', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_ITERATOR', payload: 2}
      )).toEqual(
        {
          iterator: [1, 2],
          items: [],
          tax: null, 
          total: null, 
          tip: null
        }
      );
  });

  it('should update iterator array', () => {
    expect(
      reducer(
        intialState,
        {type: 'REMOVE_ITERATOR', payload: 2}
      )).toEqual(
        {
          iterator: [1],
          items: [],
          tax: null, 
          total: null, 
          tip: null
        }
      );
  });

  it('should update items array', () => {
    expect(
      reducer(
        intialState,
        {type: 'SET_ITEMS', payload: [{item: 'test'}]}
      )).toEqual(
        {
          iterator: [1],
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
          iterator: [1],
          items: [],
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
          iterator: [1],
          items: [],
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
          iterator: [1],
          items: [],
          tax: null, 
          total: null, 
          tip: 15
        }
      );
  });

});