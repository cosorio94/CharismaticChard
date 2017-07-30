const config = require('config')['cloudVision'];
const helperFunctions = require('../helperFunctions');

const vision = require('@google-cloud/vision')({
  projectId: config.project_id,
  credentials: config
});

module.exports = (req, res, next) => {
  return vision.documentTextDetection(req.body.img)
    .then(data => {
      req.words = helperFunctions.deconstructImage.getAllWordsFromImage(data);
      req.lines = helperFunctions.deconstructImage.getTextLines(data);
      return next();
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
}

