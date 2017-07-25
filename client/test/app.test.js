import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import App from '../src/app.js';

describe('The main app', function() {

  xit('should render without throwing an error', function() {
    expect(shallow(<App />).length).toEqual(1);
  });

  xit('should be selectable by class "sample"', function() {
    expect(shallow(<App />).is('.sample')).toBe(true);
  });

  xit('should mount in a full DOM', function() {
    expect(mount(<App />).find('.sample').length).toBe(1);
  });

  xit('should render to static HTML', function() {
    expect(render(<App />).text()).toEqual('Sample');
  });

});