import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchUserNameAndPhone } from '../actions/finalActions.js';
import { fetchSplitterHistory, fetchSplitterHistoryItem } from '../actions/historyAction.js';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserNameAndPhone: () => dispatch(
      fetchUserNameAndPhone()
    ),
    fetchSplitterHistory: () => dispatch(
      fetchSplitterHistory()
    ),
    fetchSplitterHistoryItem: () => dispatch(
      fetchSplitterHistoryItem()
    ),

  };
};

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchUserNameAndPhone();
    this.props.fetchSplitterHistory();
    this.props.fetchSplitterHistoryItem();
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-center">
          <h4 className="homeWelcome">Welcome To Splitter</h4>
          <hr className="homeHR"/>
        </div>
        <div className="text-center">
          <Link className="homeSplitButton btn" to="/addImage">Split Image</Link>
        </div>
        <div className="text-center">
          <Link className="homeSplitButton btn" to="/input">Split Manual</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);