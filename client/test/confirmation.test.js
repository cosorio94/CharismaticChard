import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Confirmation from '../src/components/confirmation.js';

describe('The main app', function() {

  xit('should render without throwing an error', function() {
    expect(shallow(<Confirmation />).length).toEqual(1);
  });

});