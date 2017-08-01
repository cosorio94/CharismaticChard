
exports.up = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.string('profile_pic').notNull().defaultTo('http://icons.iconarchive.com/icons/blackvariant/button-ui-system-folders-drives/1024/Scissor-icon.png');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.dropColumn('profile_pic');
  });
};
