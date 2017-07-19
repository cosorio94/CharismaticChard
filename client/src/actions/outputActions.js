const setDebtors = (debtor) => {
  return {
    type: 'SET_DEBTORS',
    payload: debtor,
  };
};

export {
  setDebtors
};