const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',

  auths: function() {
    return this.hasMany('Auth');
  },

  splits: function () {
    return this.hasMany('Split', 'splitter_id');
  },

  items: function () {
    return this.hasMany('Item', 'debtor_id');
  }
});

module.exports = db.model('Profile', Profile);
