import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    splitter: state.final.splitter,
    picture: state.final.picture
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
          <img src={this.props.picture} className="sidebar-profile-image" />
          <Modal.Header closeButton>
            <Modal.Title> <h3> {this.props.splitter.name} </h3></Modal.Title>
          </Modal.Header>
          { this.props.children }
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHepler); 