import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon'; 
import ConnectedFriendsList, { FriendsList } from '../../src/components/friendsList.js';




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

  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = {};
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });


  // it('should be selectable by class "row"', function() {
  //   expect(shallow(<FriendsList />).is('.row')).toBe(true);
  // });


  // it('should render "Name" without throwing an error', function() {
  //   expect(shallow(<AddFriends />).contains(<Col componentClass={ControlLabel} sm={2}>
  //                   Name
  //   </Col>)).toBe(true);
  // });

  // it('should render "Number" without throwing an error', function() {
  //   expect(shallow(<AddFriends />).contains(<Col componentClass={ControlLabel} sm={2}>
  //                   Number
  //   </Col>)).toBe(true);
  // });

  // it('should mount in a full DOM', function() {
  //   expect(mount(<AddFriends />).find('.col-xs-6').length).toBe(2);
  // });

  // it('should render to static HTML', function() {
  //   expect(render(<AddFriends />).text()).toEqual('Friends ListAdd Friends');
  // });


  // it('calls open when Add Friends button trigger', function() {
  //   const addFriendsButton = sinon.spy(); 
  //   const wrapper = mount(
  //     <AddFriends />
  //   );
  //   console.log('*********', wrapper.find('#add-friends') );
  //   // wrapper.find('Button').node.props.onClick = addFriendsButton;

  //   // wrapper.update();

  //   // ReactTestUtils.Simulate.touchTap( ReactDOM.findDOMNode(wrapper.find('Button').node.props.onClick ));
  //   // expect(wrapper.calledOnce).toEqual(true);
  // });
});
