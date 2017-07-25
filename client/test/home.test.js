import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from '../src/components/home.js';

describe('The main app', function() {

  xit('should render without throwing an error', function() {
    expect(shallow(<Home />).length).toEqual(1);
  });

});