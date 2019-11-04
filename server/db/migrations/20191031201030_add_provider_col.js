
exports.up = function(knex) {
  return knex.schema.table('users', function(t) {
    t.string('provider');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(t) {
    t.dropColumn('provider');
  });
};
