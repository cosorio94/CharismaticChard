const models = require('../../../../db/models');
const controller = require('../../../controllers');

module.exports = {

  getAll: (req, res) => {
    models.Item.findAll()
      .then(profiles => {
        return controller.controller.serveData(profiles);
      });
  }



};
