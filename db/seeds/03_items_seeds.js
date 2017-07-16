const models = require('../models');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return models.Split.findOne({ split_name: 'Chipotle meal' })
    .then((split) => {
      if (!split) {
        throw split;
      }
      return models.Item.create({
        item_name: 'Burrito',
        price: 11.42,
        debtor_id: split.get('splitter_id'),
        split_id: split.get('id')
      });
    }).error(err => {
      console.error('ERROR: failed to create split');
    }).catch(() => {
      console.log('WARNING: default user does not exist');
    });

};
