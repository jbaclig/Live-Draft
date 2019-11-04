const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const jwtConfig = require('../config/jwtConfig');
const keys = require('./keys');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret
  },
  function (jwtPayload, cb) {
    User.findUser(jwtPayload)
      .then(user => {
        console.log('jwtPayload:', jwtPayload),
        console.log('user.token:', user.token);
        if(jwtPayload.token === user.token) 
          return cb(null, user);
        else
          throw('invalid token');
      })
      .catch(err => cb(err));
  }
));

passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // console.log('accessToken:', accessToken);
  // console.log('refreshToken:', refreshToken);
  // console.log('profile:', profile);
  //check for user
  User.findUser({username: profile.emails[0].value})
    .then(user => {
      console.log('User.findUser result:', user);
      if(user) {
        console.log('GoogleStrategy user exists.');
        return done(null, user);
      }
      else {
        let newUser = {
          username: profile.emails[0].value,
          provider: 'Google'
        };
        User.createToken()
          .then(token => newUser.token = token)
          .then(() => User.createThirdPartyUser(newUser))
          .then(user => done(null, user))
          .catch(err => {
            console.log(error);
            return done(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
      return done(err)
    });
  ////if found, log user in
  ////if not found, create user
  // done(null, { 
  //   accessToken: accessToken, 
  //   refreshToken: refreshToken, 
  //   profile: profile 
  // });
}));

passport.use(new FacebookStrategy({
  clientID: keys.facebook.clientID,
  clientSecret: keys.facebook.clientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['email']
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);
  console.log('profile:', profile);

  done(null, { 
    accessToken: accessToken, 
    refreshToken: refreshToken, 
    profile: profile 
  });
}));

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
        .then(() => User.createToken())
        .then(token => newUser.token = token)
        .then(() => {
          return User.createLocalUser(newUser)
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
        .then(() => User.createToken())
        .then(token => {
          user.token = token;
          User.updateUserToken(token, user)
        })
        .then(() => {
          delete user.password_digest;
          done(null, user)
        })
        .catch(err => {
          console.log(err);
          done(err);
        });
    }
));

