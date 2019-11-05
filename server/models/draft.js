const environment = process.env.NODE_ENV || 'development';    
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const createDraft = ({ name, ownerId, state }) => {
  return database.raw(
    'INSERT into drafts (name, owner_id, state, created_at) VALUES (?, ?, ?, ?) RETURNING id, name, owner_id, state',
    [name, ownerId, state, new Date()]
  )
  .then(data => data.rows[0]);
};

const getDraftById = (id) => {
  return database.raw(
    'SELECT * FROM drafts WHERE id = ?',
    [id]
  )
  .then(data => data.rows[0]);
};

const getAllUserDrafts = (userId) => {
  return database.raw(
    'SELECT * FROM drafts where owner_id = ?',
    [userId]
  )
  .then(data => data.rows);
}

const updateState = ({ id, state }) => {
  return database.raw(
    'UPDATE drafts SET state = ? WHERE id = ? RETURNING id, name, owner_id, state',
    [state, id]
  )
  .then(data => data.rows[0]);
}

module.exports = {
  createDraft,
  getDraftById,
  getAllUserDrafts,
  updateState
};