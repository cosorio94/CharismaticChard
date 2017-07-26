import React from 'react';
import Button from 'react-bootstrap/lib/Button';
// import Sidebar from 'react-sidebar';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
import SidebarHepler from './sideBarHelper.js';
import { LinkContainer } from 'react-router-bootstrap';

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
            <div className="side-bar-list">
              <a href='/profile'>profile</a>
            </div>

            <div className="side-bar-list"> 
              <a className="side-bar-list" href='/'>HOME</a>
            </div>
            <div className="side-bar-list">
              <a href='/history'>HISTORY</a><br/>
            </div>


            <div className="side-bar-list">
              <a href='/login'>LOG OUT</a><br/>
            </div>

          </Nav>
        </SidebarHepler>
      </div>
    );
  }
}


export default MainSidebars;