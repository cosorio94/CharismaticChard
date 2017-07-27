import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewURL: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewURL: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    var image = (
      <div className="col-xs-11 previewImageContainer text-center">
        <p>Take Picture to Continue</p>
      </div>
    );
    
    var { imagePreviewURL } = this.state;

    if (imagePreviewURL) {
      image = (
        <div className="col-xs-11 previewImageContainer">
          <img className="previewImage" src={imagePreviewURL}/>
        </div>
      );
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <input className="form-control" type="file" accept="image/*" capture="camera" id="camera" placeholder="Take Picture" onChange={this.handleChange} />
            </div>
          </div>
          <br></br>
          <div className="row text-center">
            {image}
          </div>
          <br></br>
          <hr />
          <div className="row">
            <div className="col-xs-12 text-center">
              <input type="submit" className="btn btn-primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);