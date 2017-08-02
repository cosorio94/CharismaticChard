import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../actions/historyAction.js';
import SidebarHepler from './sideBarHelper.js';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

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
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  toggleModal() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  historyStateChange() {
    this.props.history(true); 
    this.toggleModal();    
  }

  render() {
    return (
      <div className='Sidebar-demo col-xs-12'>
        <div className="nav row">
          <div className="col-xs-2 menuBtn align-middle">
            <div onClick={this.toggleModal} className="nav-item text-center">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
          <div className="col-xs-6">
            <Link to="/" >
              <img src="./assets/splitter-logo.gif" className="homeLogo menuBtn" />
            </Link>
          </div>
        </div>
        <SidebarHepler  side='left' isVisible={this.state.isVisible} onHide={this.toggleModal}>
          <div className="nav side-bar"> 
            <a href='/profile' className="side-bar-list">
              <div className="side-bar-list">
                PROFILE
              </div>
            </a>-
            <LinkContainer to="/" className="side-bar-list" onClick={this.toggleModal}>
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
          </div>
        </SidebarHepler>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebars); 