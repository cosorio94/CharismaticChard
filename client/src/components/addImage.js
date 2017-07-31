import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import Rnd from 'react-rnd';
import { imageDataInfo, imageItems, sendItemImageToServer } from '../actions/imageAction.js';


const mapStateToProps = state => {
  return {
    savedImages: state.image.imageItems,
    imageData: state.image
  };
};

const mapDispatchToProps = dispatch => {
  return {
    imageDataInfo: (image) => dispatch(
      imageDataInfo(image)
    ),
    imageItems: (items) => dispatch(
      imageItems(items)
    ),
    sendItemImageToServer: (input) => dispatch(
      sendItemImageToServer(input)
    ),
  };
};


class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewURL: '',
      position: null,
      isSelectButtonClick: false,
      imageData: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectedPosition = this.selectedPosition.bind(this);
    this.imageOnLoad = this.imageOnLoad.bind(this);
    this.setImagePositionsToRedux = this.setImagePositionsToRedux.bind(this);
    this.sendImageDataToServer = this.sendImageDataToServer.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewURL: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  selectedPosition () {
    let imagefirstX = $('.previewImage')[0].getBoundingClientRect().left + $(window)['scrollLeft']();
    let imagefirstY = $('.previewImage')[0].getBoundingClientRect().top + $(window)['scrollTop']();
    let imagesecondX = $('.previewImage')[0].getBoundingClientRect().right + $(window)['scrollLeft']();
    let imagesecondY = $('.previewImage')[0].getBoundingClientRect().bottom + $(window)['scrollTop']();
    let link = $('.item-selection');
    let offset = link.offset();
    let divTopY = Number(offset.top);
    let divTopX = Number(offset.left);
    let divBottomX = link.width();
    let divBottomY = link.height();
    divBottomX = divBottomX + divTopX;
    divBottomY = divBottomY + divTopY;
    this.xRelyRel(divTopX, divTopY, divBottomX, divBottomY, imagefirstX, imagefirstY, imagesecondX, imagesecondY); 
  }

  xRelyRel (divTopX, divTopY, divBottomX, divBottomY, imagefirstX, imagefirstY, imagesecondX, imagesecondY) {
    let xRel = (imagesecondX - imagefirstX ) / this.state.dimensions.naturalWidth;
    let yRel = (imagesecondY - imagefirstY ) / this.state.dimensions.naturalHeight;
    let topX = ( divTopX - imagefirstX ) / xRel; 
    let topY = ( divTopY - imagefirstY ) / yRel; 
    let bottomX = ( divBottomX - imagefirstX ) / xRel;
    let bottomY = ( divBottomY - imagefirstY ) / yRel;
    this.setState({
      position: {
        topLeft: {
          topX: topX,
          topY: topY
        },
        bottomRight: {
          bottomX: bottomX,
          bottomY: bottomY
        }
      }
    });
  }


  imageOnLoad ({ target: img }) {
    let imageData = this.getBase64Image(img); 
    this.props.imageDataInfo(imageData);
    this.setState({
      dimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      },
    });
  }

  getBase64Image(imgElem) {
    let canvas = document.createElement('canvas');
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(imgElem, 0, 0);
    let dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  setImagePositionsToRedux () {
    this.props.imageItems(this.state.position); 
    this.setState({
      isSelectButtonClick: true
    });
  }

  sendImageDataToServer () {
    this.props.sendItemImageToServer(this.props.imageData);
  }

  render() {
    let image = (
      <div className="col-xs-11 previewImageContainer text-center">
        <p>Take Picture to Continue</p>
      </div>
    );
    
    let { imagePreviewURL } = this.state;
    if (imagePreviewURL) {
      image = (
        <div className="previewImageContainer">
          <Rnd
            default={{
              x: 50,
              y: 0,
              width: 200,
              height: 50,
            }}
            className="item-selection"
            onDragStop={this.selectedPosition}
            onResizeStop={this.selectedPosition}>
          </Rnd>
          <div className="uploaded-image">
            <img className="previewImage" src={imagePreviewURL} onLoad={this.imageOnLoad}/>
          </div>
          <div className="select-imageSaved" > 
            <Button className="col-xs-2" onClick={this.setImagePositionsToRedux}> 
            Select
            </Button>
            { this.state.isSelectButtonClick ? <div>{this.props.savedImages.length} items have been saved!</div> : null }
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row previewImageContainer">
            <div className="col-xs-12"> 
              <input className="form-control" type="file" accept="image/*" capture="camera" id="camera" placeholder="Take Picture" onChange={this.handleChange} />
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            {image}
          </div>
          <br></br>
          <footer>
            <hr className="footerHR"/>
            <input type="submit" className="btn btn-primary" onClick={this.sendImageDataToServer}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);