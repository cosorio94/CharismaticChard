module.exports.generateMessage = function (data) {
  let messages = []; 
  let owner = data.owner.name;
  data.debtors.forEach( (debtor) => {
    let message = `Hello ${debtor.name}, your total debt to ${owner} is ${debtor.debtTotal}. 
                   items: ${debtor.item[0].itemName}-${debtor.item[0].itemPrice}, 
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
