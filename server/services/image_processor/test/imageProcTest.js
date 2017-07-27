// var gm = require('gm');
 
// customPreprocessor = function(file_or_stream, outfile, cb) {
//   gm(file_or_stream)
//     .resize(400, 200)
//     .in('-level', '25%,75%')
//     .write(outfile, function(error) {
//       cb(error, outfile);
//     });
// };

// const scanner = require('receipt-scanner');
 
// module.exports = () => {
//   scanner('/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt1.JPG')
//     .imagePreprocessor(['opencv', { verbose: true, removeNoise: true }])
//     .parse(function(err, results) {
//       if (err) {
//         return console.error(err);
//       } else {
//         console.log(results);
//       }
//     });
// };
var receipt1 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt1.JPG';
var receipt2 = '/Users/carlososoriov/Documents/Hack\ Reactor/thesis/CharismaticChard/server/services/image_processor/test/receipt2.jpeg';

const config = require('config')['cloudVision'];

var vision = require('@google-cloud/vision')({
  projectId: config.project_id,
  credentials: config
});

// var vision = gcloud.vision();
var receipt2 = {
  source: {
    filename: receipt2
  }
};

module.exports = () => {
  vision.documentTextDetection(receipt2)
    .then(data => {
      // console.log('data: ', data[0].textAnnotations[1].boundingPoly.vertices);
      console.log('text: ', data[0].fullTextAnnotation.pages[0]);
      // console.log('prop: ', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[4]);
      // console.log('blocks! :', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[4].symbols[0].text);
      console.log('!!blocks: ', data[0].fullTextAnnotation.pages[0].blocks[4]);
      console.log('!!paragraphs: ', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0]);
      console.log('!!words: ', data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[5]);
      console.log('!!!!word: ', getWordFromSymbols(data[0].fullTextAnnotation.pages[0].blocks[4].paragraphs[0].words[5]))
    })
    .catch(err => {
      console.log('Errror: ', err);
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

// var decomposeReceipt = (img) => {
//   vision.readDocument(img)
//     .then(data => {

//     });
// };
