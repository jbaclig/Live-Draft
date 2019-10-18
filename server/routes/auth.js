const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const router = express.Router();

router.post('/register',
  passport.authenticate('register', { session: false }),
  function(request, response) {
    console.log('register successful');
    response.redirect('/');
  }
);

// router.post('/login', 
//   passport.authenticate('login', { session: false }),
//   function(request, response) {
//     console.log('login successful');
//     response.redirect('/');
//   }
// );

router.post('/login', (request, response, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if(err || !user) {
      return response.status(400).json({
        message: 'Something went wrong',
        user: user
      });
    }

    request.login(user, { session: false }, (err) => {
      if(err) {
        response.send(err);
      }

      const token = jwt.sign(user, jwtConfig.secret);
      return response.json({ user, token });
    });
  })(request, response, next);
});

module.exports = router;
