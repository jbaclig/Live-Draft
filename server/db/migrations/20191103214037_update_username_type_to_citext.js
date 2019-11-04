
exports.up = function(knex) {
  return knex.raw(`
    ALTER table users
    ALTER COLUMN username TYPE CITEXT
  `);
};

exports.down = function(knex) {
  return knex.raw(`
    ALTER table users
    ALTER COLUMN username TYPE TEXT
  `);
};
