const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');

const auth = require('./routes/auth');
const user = require('./routes/user');
const draft = require('./routes/draft');

app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => res.send('App is working'));

app.use('/auth', auth);

app.use('/user', passport.authenticate('jwt', { session: false }), user);

app.use('/draft', draft);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile('index.html', { root: '../client/build' });
});

module.exports = app;