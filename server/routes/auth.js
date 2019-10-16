const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/register',
  passport.authenticate('register', { session: false }),
  function(request, response) {
    console.log('register successful');
    response.redirect('/');
  }
);

router.post('/login', 
  passport.authenticate('login', { session: false }),
  function(request, response) {
    console.log('login successful');
    response.redirect('/');
  }
);




module.exports = router;
