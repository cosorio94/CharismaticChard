const config = require('config')['cloudVision'];
const helperFunctions = require('../helperFunctions');

const vision = require('@google-cloud/vision')({
  projectId: process.env.CloudVision_project_id || config.project_id,
  credentials: process.env.isHeroku ? {
    type: process.env.CloudVision_type,
    project_id: process.env.CloudVision_project_id,
    private_key_id: process.env.CloudVision_private_key_id,
    private_key: process.env.CloudVision_private_key,
    client_id: process.env.CloudVision_client_id,
    auth_uri: process.env.CloudVision_auth_uri,
    token_uri: process.env.CloudVision_token_uri,
    auth_provider_x509_cert_url: process.env.CloudVision_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.CloudVision_client_x509_cert_url
  } : config
});

var receipt1 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt1.JPG';
var receipt = {
  source: {
    filename: receipt1
  }
};

module.exports = (req, res, next) => {
  return vision.documentTextDetection(formatImage(req.body.imageDataInfo))
    .then(data => {
      req.words = helperFunctions.deconstructImage.getAllWordsFromImage(data);
      req.lines = helperFunctions.deconstructImage.getTextLines(data);
      return next();
    })
    .catch((err) => {
      console.log('Error: ', err);
      return res.status(500).send(err);
    });
};

const formatImage = (imageDataInfo) => {
  return {
    content: imageDataInfo
  };
};
