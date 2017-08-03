import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
import SidebarHepler from './sideBarHelper.js';
import { LinkContainer } from 'react-router-bootstrap';
import { history } from '../actions/historyAction.js';
import { connect } from 'react-redux';
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

  historyStateChange() {
    this.props.history(true); 
    this.updateModal(false);    
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
          <div className="col-xs-6 logo-image">
            <Link to="/" >
              <img src="./assets/splitter-logo-white.gif" className="homeLogo menuBtn" />
            </Link>
          </div>
        </div>
        <SidebarHepler  side='left' isVisible={this.state.isVisible} onHide={this.toggleModal}>
          <div className="side-bar"> 
            <div className="bar-profile side-bar-list text-center">
              <a href='/profile' className="bar-list-name">
                Profile
              </a>
            </div>

            <div className="bar-home side-bar-list text-center">
              <Link className="bar-list-name" to="/" onClick={this.toggleModal}>Home</Link>
            </div>

            <div className="bar-history side-bar-list text-center">
              <Link className="bar-list-name" to="/history" onClick={this.historyStateChange.bind(this)}>History</Link>
            </div>

            <div className="bar-logout side-bar-list text-center">
              <a href='/login' className="bar-list-name">
                Log out
              </a>
            </div>
          </div>
        </SidebarHepler>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebars);