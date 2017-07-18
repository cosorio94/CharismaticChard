const Promise = require('bluebird');

module.exports.resolveErrors = (data, res) => {
  return Promise.resolve(data)
    .then((data) => {
      if (!data) {
        throw data;
      }
      return data;
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.serveData = (data, res) => {
  return module.exports.resolveErrors(data, res)
    .then(data => {
      res.status(200).send(data);
    });
};