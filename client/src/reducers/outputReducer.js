export default function reducer(state =
  {
    debtors: null,
    friendsInfo: [],
    checkUser: {},
  }, action) {
  switch (action.type) {
  case 'SET_DEBTORS': {
    return {...state, debtors: action.payload};
  }
  case 'SET_FRIENDSINFO': {
    return {...state, friendsInfo: [...state.friendsInfo, action.payload]};
  }
  case 'CHECK_USER': {
    return {...state, checkUser: action.payload, checkedUser: true};
  }
  default: {
    return state;
  }
  }
}
