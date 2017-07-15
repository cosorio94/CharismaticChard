
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function (table) {
    table.increments('id').unsigned().primary();
    table.string('item_name').notNullable();
    table.decimal('price').notNullable();
    table.integer('debtor_id').references('profiles.id');
    table.integer('split_id').references('splits.id');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
