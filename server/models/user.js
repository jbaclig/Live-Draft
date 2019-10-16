const environment = process.env.NODE_ENV || 'development';    
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//new user signup and helper functions
const signup = (req, res) => {
  const user = req.body;
  hashPassword(user.password)
    .then(hashedPassword => {
      delete user.password;
      user.password_digest = hashedPassword
    })
    .then(() => createToken())
    .then(token => user.token = token)
    .then(() => createUser(user))
    .then(user => {
      delete user.password_digest;
      res.status(201).json({ user });
    })
    .catch(err => console.log(err))
    //error - duplicate username: err.code = '23505'
};

const hashPassword = password => {
  return new Promise((res, rej) => {
    bcrypt.hash(password, 10, (err, hash) => {
      err ? rej(err) : res(hash)
    });
  });
};

const createUser = (user) => {
  return database.raw(
    "INSERT INTO users (username, password_digest, created_at) VALUES (?, ?, ?) RETURNING id, username, created_at",
    [user.username, user.password_digest, new Date()]
  )
  .then(data => data.rows[0]);
}

const createToken = () => {
  return new Promise((res, rej) => {
    crypto.randomBytes(16, (err, data) => {
      err ? rej(err) : res(data.toString('base64'));
    });
  })
}

//user signin and helper functions
const signin = (req, res) => {
  const userReq = req.body;
  let user;

  findUser(userReq)
    .then(foundUser => {
      user = foundUser;
      return checkPassword(userReq.password, foundUser)
    })
    .then(res => createToken())
    .then(token => updateUserToken(token, user))
    .then(() => {
      delete user.password_digest;
      res.status(200).json(user)
    })
    .catch(err => console.log(err));
}

const findUser = userReq => {
  return database.raw('SELECT * FROM users where username = ?', [userReq.username])
    .then(data => data.rows[0]);
}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((res, rej) => {
    bcrypt.compare(reqPassword, foundUser.password_digest, (error, response) => {
      if(error) rej(error);
      else if(response) res(response);
      else rej(new Error('Passwords don\'t match)'));
    });
  });
}

const updateUserToken = (token, user) => {
  return database.raw(
    'UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token',
    [token, user.id]
  )
    .then(data => data.rows[0]);
}

//authenticate requests with user token
const authenticate = userReq => {
  findByToken(userReq.token)
    .then(user => {
      if(user.username = userReq.username) return true;
      else return false;
    });
}

const findByToken = token => {
  return database.raw('SELECT * from users where token = ?', [token])
    .then(data => data.rows[0]);
}

module.exports = {
  signup,
  signin,
  authenticate,
  findUser,
  checkPassword,
  hashPassword,
  createUser
}