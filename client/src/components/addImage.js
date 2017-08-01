import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Button from 'react-bootstrap/lib/Button';
import Rnd from 'react-rnd';
import { imageDataInfo, 
  imageItems, 
  sendItemImageToServer, 
  imageTax,
  imageTotal } from '../actions/imageAction.js';
import { Link } from 'react-router-dom';

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
    imageTax: (items) => dispatch(
      imageTax(items)
    ),
    imageTotal: (items) => dispatch(
      imageTotal(items)
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
      itemPosition: null,
      taxPosition: null,
      totalPosition: null,
      isSelectItemButtonClick: false,
      isSelectTaxButtonClick: false,
      isSelectTotalButtonClick: false,
      imageData: null,
      selectBox: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectedPosition = this.selectedPosition.bind(this);
    this.imageOnLoad = this.imageOnLoad.bind(this);
    this.sendImageDataToServer = this.sendImageDataToServer.bind(this);
    this.selectItemBox = this.selectItemBox.bind(this);
    this.selectTaxBox = this.selectTaxBox.bind(this);
    this.selectTotalBox = this.selectTotalBox.bind(this);
    this.setImageItemPositionsToRedux = this.setImageItemPositionsToRedux.bind(this);
    this.setImageTaxPositionsToRedux = this.setImageTaxPositionsToRedux.bind(this);
    this.setImageTotalPositionsToRedux = this.setImageTotalPositionsToRedux.bind(this);
    this.imagePosition = this.imagePosition.bind(this);
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

  imagePosition () {
    let imagefirstX = $('.previewImage')[0].getBoundingClientRect().left + $(window)['scrollLeft']();
    let imagefirstY = $('.previewImage')[0].getBoundingClientRect().top + $(window)['scrollTop']();
    let imagesecondX = $('.previewImage')[0].getBoundingClientRect().right + $(window)['scrollLeft']();
    let imagesecondY = $('.previewImage')[0].getBoundingClientRect().bottom + $(window)['scrollTop']();
    this.selectedPosition(imagefirstX, imagefirstY, imagesecondX, imagesecondY);
  }

  selectedPosition (imagefirstX, imagefirstY, imagesecondX, imagesecondY) {
    let link = $('.' + this.state.selectBox);
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
    let xRel = ( imagesecondX - imagefirstX ) / this.state.dimensions.naturalWidth;
    let yRel = ( imagesecondY - imagefirstY ) / this.state.dimensions.naturalHeight;
    let topX = ( divTopX - imagefirstX ) / xRel; 
    let topY = ( divTopY - imagefirstY ) / yRel; 
    let bottomX = ( divBottomX - imagefirstX ) / xRel;
    let bottomY = ( divBottomY - imagefirstY ) / yRel;
    if (this.state.selectBox === 'select-itemBox') {
      this.setItemPosition(topX, topY, bottomX, bottomY); 
    } else if (this.state.selectBox === 'select-taxBox') {
      this.setTaxPosition(topX, topY, bottomX, bottomY); 
    } else if (this.state.selectBox === 'select-totalBox') {
      this.setTotalPosition(topX, topY, bottomX, bottomY); 
    }
  }

  setTaxPosition (topX, topY, bottomX, bottomY) {
    this.setState({
      taxPosition: {
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

  setItemPosition (topX, topY, bottomX, bottomY) {
    this.setState({
      itemPosition: {
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

  setTotalPosition (topX, topY, bottomX, bottomY) {
    this.setState({
      totalPosition: {
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
    this.props.imageDataInfo(img.src.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''));
    this.setState({
      dimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      },
    });
  }

  setImageItemPositionsToRedux () {
    this.props.imageItems(this.state.itemPosition); 
    this.setState({
      isSelectItemButtonClick: true
    });
  }

  setImageTaxPositionsToRedux () {
    this.props.imageTax(this.state.taxPosition);
    this.setState({
      isSelectTaxButtonClick: true,
    });
  }

  setImageTotalPositionsToRedux () {
    this.props.imageTotal(this.state.totalPosition);
    this.setState({
      isSelectTotalButtonClick: true,
    });
  }

  sendImageDataToServer () {
    console.log('thisimageDATAAA', this.props.imageData);
    this.props.sendItemImageToServer(this.props.imageData);
  }

  selectItemBox () {
    this.setState({
      selectBox: 'select-itemBox'
    });
  }

  selectTaxBox () {
    this.setState({
      selectBox: 'select-taxBox'
    });
  }

  selectTotalBox () {
    this.setState({
      selectBox: 'select-totalBox'
    });
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
          <div className="select-divBox text-center">
            <Button onClick={this.selectItemBox}>Select Items</Button>
            <Button onClick={this.selectTaxBox}>Select tax</Button>
            <Button onClick={this.selectTotalBox}>Select total</Button>
          </div>
          {this.state.selectBox === null ? null : <Rnd
            default={{
              x: -150,
              y: 0,
              width: 200,
              height: 50,
            }}
            className={this.state.selectBox}
            onDragStop={this.imagePosition}
            onResizeStop={this.imagePosition}>
          </Rnd>}

          <div className="uploaded-image">
            <img className="previewImage" src={imagePreviewURL} onLoad={this.imageOnLoad}/>
          </div>
          <div className="select-imageSaved" > 
            <div className="select-divBox text-center">
              <Button onClick={this.setImageItemPositionsToRedux}> 
                Save Item
              </Button>
              <Button onClick={this.setImageTaxPositionsToRedux}>
                Save Tax
              </Button>
              <Button onClick={this.setImageTotalPositionsToRedux}>
                Save Total
              </Button>
            </div>
            { this.state.isSelectItemButtonClick ? <div>{this.props.savedImages.length} items have been saved!</div> : null }
            { this.state.isSelectTaxButtonClick ? <div>Tax has been saved!</div> : null }
            { this.state.isSelectTotalButtonClick ? <div>Total has been saved!</div> : null }
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
          <div className="text-center">
            {image}
          </div>
          <br></br>
          <footer>
            <hr className="footerHR"/>
            <Link className="btn btn-primary" to="/imageResults" onClick={this.sendImageDataToServer}>Submit</Link>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);