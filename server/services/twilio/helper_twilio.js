module.exports.generateMessage = function (data) {
  let messages = []; 
  let owner = data.splitter.name;
  data.debtors.forEach( (debtor) => {
    let message = `Hello ${debtor.name}, your total debt to ${owner} for ${data.splitName} is ${debtor.debtTotal}. 
                   items: ${debtor.items[0].itemName}-${debtor.items[0].itemPrice}, 
                   tax: ${debtor.tax} 
                   tip: ${debtor.tip}`;
    messages.push(message);
  });
  return messages; 
};


module.exports.numbersForTextMessage = function (debtors) {
  let numbers = []; 
  debtors.forEach( (debtor) => {
    numbers.push(debtor.phone); 
  });
  return numbers; 
};
