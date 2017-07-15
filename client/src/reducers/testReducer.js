export default function reducer(state = {numbers: 0, name: 'kai'}, action) {
  switch (action.type) {
  case 'FETCH_TEST_FULILLED': {
    return {...state, numbers: action.payload};
  }
  case 'SET_TEST_NUMBER': {
    return {...state, numbers: action.payload};
  }
  default: {
    return state;
  }
  }
}