
exports.up = function(knex, Promise) {
  return knex.schema.createTable('splits', function (table) {
    table.increments('id').unsigned().primary();
    table.string('split_name').nullable();
    table.decimal('total').notNullable();
    table.decimal('tax').nullable();
    table.decimal('tip').nullable();
    table.integer('splitter_id').references('profiles.id');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('splits');
};
