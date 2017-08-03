export default function reducer(state =
  {
    checkUser: {},
  }, action) {
  switch (action.type) {
  case 'CHECK_USER': {
    return {...state, checkUser: action.payload};
  }
  default: {
    return state;
  }
  }
}
