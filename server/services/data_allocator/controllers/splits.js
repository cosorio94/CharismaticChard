const models = require('../../../../db/models');
const controller = require('../../../controllers');

module.exports = {

  getAll: (req, res) => {
    return models.Split.findAll()
      .then(controller.Controller.serveData)
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  saveSplit: (req, res) => {
    // find with first name as well
    return models.Profile.findOne({ phone: req.body.splitter.phone })
      // .then(controller.Controller.resolveErrors)
      .then(profile => {
        req.split['splitter_id'] = profile.get('id');
        return models.Split.create(req.split);
      });
  }



};
