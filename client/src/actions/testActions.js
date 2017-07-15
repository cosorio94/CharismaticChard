const fetchNumbers = () => {
  return {
    type: 'FETCH_TEST_FULILLED',
    payload: 13423,
  };
};

const setNumbers = (numbers) => {
  return {
    type: 'SET_TEST_NUMBER',
    payload: numbers,
  };
};

export {
  fetchNumbers, 
  setNumbers
};