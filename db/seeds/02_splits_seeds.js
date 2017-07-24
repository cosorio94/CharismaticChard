const models = require('../models');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return models.Profile.findOne({ email: 'minjilee1@hotmail.com' })
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return models.Split.create({
        split_name: 'Chipotle meal',
        total: 14.54,
        tax: 1.32,
        tip: 1.27,
        splitter_id: profile.get('id')
      });
    }).error(err => {
      console.error('ERROR: failed to create split');
    }).catch(() => {
      console.log('WARNING: default user does not exist');
    });


};
