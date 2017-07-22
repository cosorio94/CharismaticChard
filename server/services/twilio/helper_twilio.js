const formatPhone = require('../../helperFunctions/parsePhone.js').parseAndFormatPhone;

module.exports.generateMessage = function (data) {
  let messages = []; 
  let owner = data.splitter.name;
  data.debtors.forEach( (debtor) => {
    let message = `Hello ${debtor.name}, your total debt to ${owner} for ${data.splitName} is ${debtor.debtTotal}. 
                   items: ${getItems(debtor.items)}
                   tax: ${debtor.tax} 
                   tip: ${debtor.tip}`;
    messages.push(message);
  });
  return messages; 
};

const getItems = function(items) {
  let result = '';
  items.forEach( (item, index, items) => {
    let comma = ', ';
    if (index === items.length - 1) {
      comma = '';
    }
    result += item.itemName + '-' + item.itemPrice + comma;
  });
  return result;
};


module.exports.numbersForTextMessage = function (debtors) {
  let numbers = []; 
  debtors.forEach( (debtor) => {
    numbers.push(formatPhone(debtor.phone)); 
  });
  return numbers; 
};
