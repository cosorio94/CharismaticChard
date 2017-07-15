const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',

  auths: function() {
    return this.hasMany('Auth');
  },

  splits: function () {
    return this.hasMany('Split');
  },

  items: function () {
    return this.hasMany('Item');
  }
});

module.exports = db.model('Profile', Profile);
