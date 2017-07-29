import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import sinon from 'sinon'; 
import ConnectedAddFriends, { AddFriends } from '../../src/components/addFriends.js';

// const SampleComponent = (props = {}) => (
//   <div className="sample">
//     Sample
//   </div>
// );



// const thunk = ({ dispatch, getState }) => next => action => {
//   if (typeof action === 'function') {
//     return action(dispatch, getState)
//   }

//   return next(action)
// }

// const create = () => {
//   const store = {
//     getState: jest.fn(() => ({})),
//     dispatch: jest.fn(),
//   };
//   const next = jest.fn()

//   const invoke = (action) => thunk(store)(next)(action)

//   return {store, next, invoke}
// };



const thunk = ({ mapStateToProps, mapDispatchToProps }) => next => action => {
  if (typeof action === 'function') {
    return action(mapStateToProps, mapDispatchToProps);
  }

  return next(action);
};

const create = () => {
  const store = {
    mapStateToProps: jest.fn(() => ({})),
    mapDispatchToProps: jest.fn(),
  };
  const next = jest.fn();
  const invoke = (action) => thunk(store)(next)(action);
  return {store, next, invoke};
}; 


describe('A addFriends react component', function() {
  xit('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = {type: 'SET_FRIENDSINFO'};
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  xit('calls the function', () => {
    const { invoke } = create();
    const fn = jest.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });

  xit('passes mapStateToProps and mapDispatchToProps', () => {
    const { store, invoke } = create();
    invoke((mapStateToProps, mapDispatchToProps) => {
      mapDispatchToProps('setFriendsInfo');
      mapStateToProps();
    });
    expect(store.mapDispatchToProps).toHaveBeenCalledWith('setFriendsInfo');
    expect(store.mapStateToProps).toHaveBeenCalled();
  });

  xit('should be selectable by class "row"', function() {
    expect(shallow(<AddFriends />).is('.row')).toBe(true);
  });

  xit('should render "Name" without throwing an error', function() {
    expect(shallow(<AddFriends />).contains(<Col componentClass={ControlLabel} sm={2}>
                    Name
    </Col>)).toBe(true);
  });

  xit('should render "Number" without throwing an error', function() {
    expect(shallow(<AddFriends />).contains(<Col componentClass={ControlLabel} sm={2}>
                    Number
    </Col>)).toBe(true);
  });

  xit('should mount in a full DOM', function() {
    expect(mount(<AddFriends />).find('.col-xs-6').length).toBe(2);
  });

  xit('should render to static HTML', function() {
    expect(render(<AddFriends />).text()).toEqual('Friends ListAdd Friends');
  });

  xit('calls open when Add Friends button trigger', function() {
    // const open = sinon.spy(); 
    // const wrapper = mount(
    //   <AddFriends />
    // );
    // sinon.spy(AddFriends.prototype, 'open');
    // const wrapper = mount(<AddFriends />);

    // console.log('*********', wrapper.find('AddFriends').node.Open );
    // wrapper.find('Button').node.props.onClick = addFriendsButton;
    
    // expect(AddFriends.prototype.open.calledOnce).toEqual(true);

    // wrapper.update();
    // ReactTestUtils.Simulate.touchTap( ReactDOM.findDOMNode(wrapper.find('Button').node.props.onClick ));
    // expect(wrapper.calledOnce).toEqual(true);
  });
});
