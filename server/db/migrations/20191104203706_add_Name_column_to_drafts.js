
exports.up = function(knex) {
  return knex.schema.table('drafts', function(t) {
    t.string('name');
  });
};

exports.down = function(knex) {
  return knex.schema.table('drafts', function(t) {
    t.dropColumn('name');
  });
};
