
exports.up = function(knex) {
  let createQuery = `CREATE TABLE drafts(
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INT,
    state JSON,
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex) {
  return knex.schema.dropTable('drafts');
};
