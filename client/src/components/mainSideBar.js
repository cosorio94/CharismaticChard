import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
import SidebarHepler from './sideBarHelper.js';
import { LinkContainer } from 'react-router-bootstrap';
import { history } from '../actions/historyAction.js';

import { connect } from 'react-redux';




const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    history: (toggle) => dispatch(
      history(toggle)
    ),
  };
};



class MainSidebars extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: false
    };
  }
  
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  historyStateChange() {
    this.props.history(true); 
    this.updateModal(false);    
  }

  render() {
    return (
      <div className='Sidebar-demo'>
        <div className="homeLogoDiv text-center">
          <img src="./assets/splitter-logo.png" className="homeLogo mx-auto d-block" />
        </div>
        <div className="container2" onClick={ () => this.updateModal(true)}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <SidebarHepler side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false)}>
          <Nav>

            <a href='/profile' className="side-bar-list">
              <div className="side-bar-list">
                PROFILE
              </div>
            </a>

            <LinkContainer to="/" className="side-bar-list" onClick={ () => this.updateModal(false)}>
              <div className="side-bar-button">
                HOME
              </div>
            </LinkContainer>

            <LinkContainer to="/history" className="side-bar-list" onClick={this.historyStateChange.bind(this)}>
              <div className="side-bar-button">
                HISTORY
              </div>
            </LinkContainer>
    

            <a href='/login' className="side-bar-list">
              <div className="side-bar-list">
                LOG OUT
              </div>
            </a>
          </Nav>
        </SidebarHepler>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebars); 





//           <Navbar>
//   <Navbar.Header>
//     <Navbar.Brand>
//       <a href="#">React-Bootstrap</a>
//     </Navbar.Brand>
//   </Navbar.Header>
//   <Nav>
//     <NavItem eventKey={1} href="#">Link</NavItem>
//     <NavItem eventKey={2} href="#">Link</NavItem>
//     <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
//       <MenuItem eventKey={3.1}>Action</MenuItem>
//       <MenuItem eventKey={3.2}>Another action</MenuItem>
//       <MenuItem eventKey={3.3}>Something else here</MenuItem>
//       <MenuItem divider />
//       <MenuItem eventKey={3.4}>Separated link</MenuItem>
//     </NavDropdown>
//   </Nav>
// </Navbar>

