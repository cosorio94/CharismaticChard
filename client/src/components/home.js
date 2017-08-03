import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="text-center">
          <h4 className="homeWelcome">Welcome To Splitter!</h4>
        </div>
        <div className="mainHome-btn text-center">
          <Link className="homeSplitButton btn" to="/addImage">Split  Image</Link>
        </div>
        <div className="mainHome-btn text-center">
          <Link className="homeSplitButton btn" to="/input">Split Manually</Link>
        </div>
      </div>
    );
  }
}

export default Home;