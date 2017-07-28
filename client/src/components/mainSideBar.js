import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
import SidebarHepler from './sideBarHelper.js';
import { LinkContainer } from 'react-router-bootstrap';
import { history } from '../actions/historyAction.js';

import { connect } from 'react-redux';

import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router-dom';



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
        <Nav>
          <NavItem onClick={ () => this.updateModal(true)}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </NavItem>
          <Link to="/" >
            <img src="./assets/splitter-logo.gif" className="homeLogo" />
          </Link>
        </Nav>
        <SidebarHepler  side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false)}>
          <Nav className="side-bar"> 
            <a href='/profile' className="side-bar-list">
              <div className="side-bar-list">
                PROFILE
              </div>
            </a>
            <LinkContainer to="/" className="side-bar-list" onClick={ () => this.updateModal(false)}>
              <div className="side-bar-list">
                HOME
              </div>
            </LinkContainer>
            <LinkContainer to="/history" className="side-bar-list" onClick={this.historyStateChange.bind(this)}>
              <div className="side-bar-list">
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