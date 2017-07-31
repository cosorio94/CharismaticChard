// const regExp = /(\d*)+([^]*)(\$*)(\d+\.\d+)/;
const regExp = /(\d+\.\d+)*\s*(\d*)+\s*([^]*)\s(\$*)(\d+\.\d+)/;
const regExp2 = /(\d+\.\d+)*\s*(\d*)+\s*([^]*)\s(\$*)(\d+\.\d+)*/;

module.exports = (lines) => {
  return lines.map(line => {
    return deconstructLine(line);
  });
};

const deconstructLine = (line) => {
  var match = line.text.match(regExp);
  if (match === null) {
    match = line.text.match(regExp2);
  }
  console.log('match: ', match);
  return match !== null ? {
    quantity: !match[1] ? match[2] : '1',
    // 'pre-item': match[0],
    item: !match[1] ? match[3] : match[1] + match[2] + match[3],
    price: match[5]
  } : null;
};
