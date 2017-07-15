const db = require('../');

const Item = db.Model.extend({
  tableName: 'items',
  hasTimestamps: true,

  split: function () {
    return this.belongsTo('Split');
  },

  profile: function () {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Item', Item);