const config = require('config')['cloudVision'];

const vision = require('@google-cloud/vision')({
  projectId: config.project_id,
  credentials: config
});


// const getBlocksFromImage = (req, res) => {
//   return vision.documentTextDetection(req.img)
//     .then(data => {
//       getAllBlocks(data).map(block => {
//         return {
//           bounds: block.boundingBox.vertices,
//           detectedBreak: block.property.detectedBreak,
//           blockType: block.blockType,
//           // get all the words from its paragraphs.
//           // text: 
//         };
//       });
//     });
// };

