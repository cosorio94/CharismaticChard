import axios from 'axios';

const history = (toggle) => {
  return {
    type: 'HISTORY',
    payload: toggle,
  };
};


const fetchSplitterHistory = () => {
  return (dispatch) => {
    axios.get('/api/split-history')
      .then(res => {
        dispatch({type: 'SPLITTER-HISTORY', payload: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  };
};


const splitterHistory = (input) => {
  return {
    type: 'SPLITTER-HISTORY',
    payload: input
  };
};



export {
  history,
  fetchSplitterHistory,
  splitterHistory
};