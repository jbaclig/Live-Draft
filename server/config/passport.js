const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const jwtConfig = require('../config/jwtConfig');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret
  },
  function (jwtPayload, cb) {
    User.findUser(jwtPayload)
      .then(user => cb(null, user))
      .catch(err => cb(err));
  }
));

passport.use(
  'register',
  new LocalStrategy(
    function(username, password, done) {
      let newUser = {};
      User.findUser({username})
        .then(user => {
          if(user) {
            console.log('username already taken.');
            throw('username already taken.');
          }
          else {
            newUser.username = username;
            return User.hashPassword(password);
          }
        })
        .then(hashedPassword => newUser.password_digest = hashedPassword)
        .then(() => {
          return User.createUser(newUser)
        })
        .then(user => {
          delete user.password_digest;
          done(null, user);
        })
        .catch(err => {
          console.log(err);
          done(err);
        });
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    function(username, password, done) {
      let user;
      User.findUser({username})
        .then(foundUser => {
          user = foundUser;
          if(!user) throw 'user does not exist.';
          else return User.checkPassword(password, user);
        })
        .then(() => done(null, user))
        .catch(err => {
          console.log(err);
          done(err);
        });
    }
));

