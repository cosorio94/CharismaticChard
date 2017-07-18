const models = require('../../db/models');
const Controller = require('./controller.js');
const Promise = require('bluebird');

module.exports = {

  getAll: (req, res) => {
    models.Item.findAll()
      .then(profiles => {
        return Controller.serveData(profiles);
      })
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  saveOneItem: (item, split_id, profile_id) => {
    item['debtor_id'] = profile_id;
    item['split_id'] = split_id;
    return models.Item.create(item);
  },

  saveItems: (items, split_id, profile_id) => {
    return Promise.map(items, (item) => {
      return module.exports.saveOneItem(item, split_id, profile_id);
    });
  }



};
