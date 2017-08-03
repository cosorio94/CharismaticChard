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
        <div className="mainBtn">
          <div className="mainHome-btn text-center">
            <Link className="homeSplitButton split-image" to="/addImage"><span className="glyphicon glyphicon-camera icon-home"></span>Split  Image</Link>
          </div>
          <div className="mainHome-btn text-center">
            <Link className="homeSplitButton split-manual" to="/input"><span className="fa fa-heart icon-heart"></span>Split Manually</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;