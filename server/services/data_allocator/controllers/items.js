const models = require('../../db/models');

module.exports = {

  getAll: (req, res) => {
    models.Split.findAll()
      .then(profiles => {

      })
  }

}

module.exports.sendData = (data, res) => {
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
}