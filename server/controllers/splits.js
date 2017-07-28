const models = require('../../db/models');
const Controller = require('./controller.js');
const Promise = require('bluebird');

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

  getSplitItems: (id) => {
    return models.Split.findAll({ id }, { withRelated: 'items' })
      .catch((err) => {
        console.log(err);
      });
  },

  getMultipleSplitItems: (splits) => {
    return Promise.map(splits, (split, index, splits) => {
      return module.exports.getSplitItems(split.id)
        .then(results => {
          split.items = results.at(0).related('items').toJSON();
          return split;
        });
    });
  },

  getUsersItems: (req, res) => {
    // returns an object with the info for all the splits and items that belong to the user
    return models.Profile.forge().where({ id: req.user.id }).fetchAll({
      // page: 1,
      // pageSize: 20,
      withRelated: ['splits', 'items']
    });
  },

  getUsersSplits: (req, res) => {
    // returns an array of splits with all the items that belong to each split.
    return module.exports.getUsersItems(req, res)
      .then(result => {
        // req.userItems = result;
        splits = result.at(0).related('splits').toJSON();
        return module.exports.getMultipleSplitItems(splits);
      });
  }



};
