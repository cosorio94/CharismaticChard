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
    var image = null;
    var { imagePreviewURL } = this.state;
    if (imagePreviewURL) {
      image = <img id="frame" src={imagePreviewURL}/>;
    }
    return (
      <div>
        <input type="file" accept="image/*" capture="camera" id="camera" onChange={this.handleChange} />
        {image}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddImage);