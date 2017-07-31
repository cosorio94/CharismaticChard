const config = require('config')['cloudVision'];
const helperFunctions = require('../helperFunctions');

const vision = require('@google-cloud/vision')({
  projectId: config.project_id,
  credentials: config
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
