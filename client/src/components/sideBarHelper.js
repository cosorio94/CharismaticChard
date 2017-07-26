import React from 'react';
import Button from 'react-bootstrap/lib/Button';
// import Sidebar from 'react-sidebar';
import Nav from 'react-bootstrap/lib/Nav';
import Modal from 'react-bootstrap/lib/Modal';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



const mapStateToProps = state => {
  return {
    splitter: state.final.splitter
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};



class SidebarHepler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Modal className='Sidebar left' show={ this.props.isVisible } onHide={this.props.onHide} autoFocus keyboard>
          <Modal.Header closeButton>
            <Modal.Title>  {this.props.splitter.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.props.children }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SidebarHepler); 
