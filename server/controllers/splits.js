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
    return models.Profile.findOne({ id: req.user.id })
      .then(profile => {
        req.split['splitter_id'] = profile.get('id');
        return models.Split.create(req.split);
      });
  },

  getSplitItems: (id) => {
    return models.Split.forge()
      .query(function(qb) {
        qb.orderBy('created_at', 'DESC'); 
      })
      .where({ id })
      .fetchAll({ withRelated: 'items' })
      .catch((err) => {
        console.log(err);
      });
  },

  getMultipleSplits: (splitIds) => {
    return Promise.map(splitIds, (id) => {
      return module.exports.getSplitItems(id)
        .then(result => {
          return result.at(0).toJSON();
        });
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
    return models.Profile.forge().where({ id: req.user.id })
      .fetchAll({ withRelated: ['splits', 'items'] })
      .catch(err => {
        console.log(err);
      });
  },

  getUsersOwnedSplits: (req, res) => {
    // returns an array of splits with all the items that belong to each split.
    return module.exports.getUsersItems(req, res)
      .then(result => {
        var splits = result.at(0).related('splits').toJSON();
        return module.exports.getMultipleSplitItems(splits);
      });
  },

  getUsersParticipatedSplits: (req, res) => {
    return module.exports.getUsersItems(req, res)
      .then(result => {
        return module.exports.getMultipleSplits(getSplitIds(result));
      })
      .catch(err => {
        console.log(err);
      });
  },

  getUsersItemsWithSplit: (req, res) => {
    return module.exports.getUsersItems(req, res)
      .then(userItems => {
        return addSplitToItems(userItems);
      });
  }

};

const getSplitIds = (userItems) => {
  var items = userItems.at(0).related('items').toJSON();
  return items.map((item, index, splitIds) => {
    if (!splitIds.includes(item['split_id'])) {
      return item['split_id'];
    }
  });
};

const getItemUser = (item) => {

};

const getItemSplit = (item) => {
  return models.Split.findById(item['split_id'])
    .then(split => {
      item.split = split.toJSON();
      return item;
    });
};

const addSplitToItems = (userItems) => {
  var items = userItems.at(0).related('items').toJSON();
  return Promise.map(items, (item) => {
    return getItemSplit(item)
      .then(item => {
        return getItemSplitter(item);
      });
  });
};

const getItemSplitter = (item) => {
  return models.Profile.findById(item.split.splitter_id)
    .then(splitter => {
      item.splitter = splitter.toJSON();
      return item;
    });
};




