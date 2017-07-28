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
      getAllBlocks(data).map(block => {
        return {
          bounds: block.boundingBox.vertices,
          detectedBreak: block.property.detectedBreak,
          blockType: block.blockType,
          // get all the words from its paragraphs.
          // text: 
        };
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

const getAllBlocks = (data) => {
  return data[0].fullTextAnnotation.pages[0].blocks;
};

const getAllParagraphs = (data) => {
  var paragraphData = [];
  getAllBlocks(data).forEach(block => {
    block.paragraphs.forEach(paragraph => {
      paragraphData.push(paragraph);
    });
  });
  return paragraphData;
};

const getAllWordsFromImage = (data) => {
  var wordData = [];
  getAllParagraphs(data).forEach(paragraph => {
    paragraph.words.forEach(word => {
      wordData.push(getWordFromSymbols(word));
    });
  });
  return wordData;
};

const getAllWordsFromParagraph = (paragraph) => {
  return paragraph.words.map(word => {
    return getWordFromSymbols(word);
  });
};

const getTextFromParagraph = (paragraph) => {
  return getAllWordsFromParagraph(paragraph).map(word => {
    return word.text;
  }).join(' ');
};

const getParagraphsFromImage = (data) =>{
  return getAllParagraphs(data).map(paragraph => {
    return formatParagraph(paragraph);
  });
};

const formatParagraph = (paragraph) => {
  return {
    detectedBreak: paragraph.property.detectedBreak,
    bounds: paragraph.boundingBox.vertices,
    text: getTextFromParagraph(paragraph)
  };
};

const getAllParagraphsFromBlock = (block) => {
  return block.paragraphs.map(paragraph => {
    return formatParagraph(paragraph);
  });
};

const formatBlock = (block) => {
  return {
    bounds: block.boundingBox.vertices,
    detectedBreak: block.property.detectedBreak,
    blockType: block.blockType,
    text: getAllWordsFromBlock(block)
  };
};

const getAllWordsFromBlock = (block) => {
  return getAllParagraphsFromBlock(block).map(paragraph => {
    return paragraph.text;
  }).join('\n');
};

const getBlocksFromImage = (data) => {
  return getAllBlocks(data).map(block => {
    return formatBlock(block);
  });
};




