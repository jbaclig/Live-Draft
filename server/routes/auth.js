const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const router = express.Router();

router.post('/register', (request, response, next) => {
  passport.authenticate('register', { session: false }, (err, user, info) => {
    if(err || !user) {
      return response.status(400).json({
        message: 'Somthing went wrong',
        error: err,
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

router.post('/login', (request, response, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if(err || !user) {
      return response.status(400).json({
        message: 'Something went wrong',
        error: err,
        user: user
      });
    }
    else if(user.provider !== 'email') {
      return response.status(400).json({
        message: 
          'You previously logged in with ' + user.provider + '. ' + 
          'Please login using ' + user.provider + '.',
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

router.get(
	'/google',
	passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
	}),
);

router.get('/google/callback', (request, response, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if(err || !user) {
      return response.status(400).json({
        message: 'Something went wrong',
        error: err,
        user: user
      });
    }
    else if(user.provider !== 'Google') {
      return response.status(400).json({
        message: 
          'You previously logged in with ' + user.provider + '. ' + 
          'Please login using ' + user.provider + '.',
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

router.get(
  '/facebook', 
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback', (request, response, next) => {
  passport.authenticate('facebook', { session: false }, (err, user, info) => {
    console.log('user:', user);
    if(err || !user) {
      return response.status(400).json({
        message: 'Something went wrong',
        error: err,
        user: user
      });
    }
    else if(user.provider !== 'Facebook') {
      return response.status(400).json({
        message: 
          'You previously logged in with ' + user.provider + '. ' + 
          'Please login using ' + user.provider + '.',
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

// router.get(
//   '/facebook/callback', 
//   passport.authenticate('facebook', { session: false }),
//   function(request, response) {
//     response.redirect('/');
//     console.log('Facebook login success');
//   }
// );

module.exports = router;
