const models = require('../../db/models');
const Controller = require('./controller.js');

module.exports = {

  getAll: (req, res) => {
    return models.Split.findAll()
      .then(Controller.serveData)
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  saveSplit: (req, res) => {
    // find with first name as well (or with user id)
    // return models.Profile.findOne({ phone: req.body.splitter.phone })
    return models.Profile.findOne({ id: req.user.id })
      // .then(Controller.resolveErrors)
      .then(profile => {
        req.split['splitter_id'] = profile.get('id');
        return models.Split.create(req.split);
      });
  },

  getUsersSplits: (req, res) => {
    // return models.Split.forge().where({ id: 2/*req.user.id*/ }).fetchPage({
    //   page: 1,
    //   pageSize: 20,
    //   withRelated: 'items'
    // });
    return models.Profile.forge().where({ id: 2/*req.user.id*/ }).fetchPage({
      page: 1,
      pageSize: 20,
      withRelated: ['splits']
    });
  }



};
