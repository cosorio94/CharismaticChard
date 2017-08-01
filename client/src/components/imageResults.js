import React from 'react';
import { connect } from 'react-redux';
// import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
// import { imageDataInfo, imageItems, sendItemImageToServer } from '../actions/imageAction.js';
import { Link } from 'react-router-dom';
import ImageItemList from './imageItemList.js';



const mapStateToProps = state => {
  return {
    savedImages: state.image.imageItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    imageDataInfo: (image) => dispatch(
      imageDataInfo(image)
    ),
  };
};


class ImageResults extends React.Component {
  constructor(props) {
    super(props);
 
  }

  render() {
    return (
      <div className="head">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <ImageItemList />
            </div>
            <div className="col-xs-12">
              editButton should be here 
            </div>
          </div>
        </div>
        <footer>
          <Link className="btn btn-primary" to="/addImage" >Go Back</Link>
          <Link className="btn btn-primary" to="/confirmation">Calculate</Link>
        </footer>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ImageResults);


