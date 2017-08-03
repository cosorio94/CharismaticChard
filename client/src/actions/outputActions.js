import axios from 'axios';

const checkUserAction = (username) => {
  return (dispatch) => {
    axios.get(`/api/check-user/${username}`)
      .then(res => {
        dispatch({type: 'CHECK_USER', payload: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export {
  checkUserAction,
};