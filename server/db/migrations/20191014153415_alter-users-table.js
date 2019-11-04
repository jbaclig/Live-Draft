
exports.up = function(knex) {
  let alterQuery = `
    ALTER TABLE users
    ADD CONSTRAINT constraint_name UNIQUE (username)
  `;
  return knex.raw(alterQuery);
};

exports.down = function(knex) {
  let undoAlterQuery = `
    ALTER TABLE users
    DROP CONSTRAINT constraint_name
  `;
  return knex.raw(undoAlterQuery);
};
