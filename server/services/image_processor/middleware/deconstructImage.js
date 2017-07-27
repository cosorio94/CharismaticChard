const config = require('config')['cloudVision'];

const vision = require('@google-cloud/vision')({
  projectId: config.project_id,
  credentials: config
});

var receipt2 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt2.jpeg';
var receipt2 = {
  source: {
    filename: receipt2
  }
};

const getBlocksFromImage = (req, res) => {
  return vision.documentTextDetection(req.img)
    .then(data => {
      data[0].fullTextAnnotation.pages[0].blocks.map(block => {
        return {
          bounds: block.boundingBox.vertices,
          detectedBreak: block.property.detectedBreak,
          blockType: block.blockType,
          // get all the words from its paragraps.
          // text: 
        }
      });
    });
};

const getWordFromSymbols = (word) => {
  return {
    detectedBreak: word.property.detectedBreak,
    bounds: word.boundingBox.vertices,
    text: word.symbols.map(symbol => {
      return symbol.text;
    }).join('')
  };
};

const getBlocks = (data) => {
  return data[0].fullTextAnnotation.pages[0].blocks;
};