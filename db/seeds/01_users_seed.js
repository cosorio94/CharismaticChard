const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.Profile.where({ email: 'admin@domain.com' }).fetch()
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.Profile.forge({
        first: 'System',
        last: 'Admin',
        display: 'Administrator',
        email: 'admin@domain.com'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then((profile) => {
      return models.Auth.forge({
        type: 'local',
        password: 'admin123',
        profile_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: defualt user already exists.');
    })
    .then(() => {
      return models.Profile.upsert({
        first: 'Minji',
        last: 'Lee',
        display: 'Minji Lee',
        email: 'minjilee1@hotmail.com',
        phone: '+15108290026'
      });
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then(profile => {
      return models.Auth.upsert({
        type: 'local',
        password: '12345',
        profile_id: profile.get('id')
      });
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(() => {
      console.log('WARNING: defualt user already exists.');
    });
};
