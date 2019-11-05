const express = require('express');
const passport = require('passport');
const router = express.Router();
const Draft = require('../models/draft');

router.post('/create/', (request, response, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if(err) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: err
      });
    }
    else if(request.body.ownerId !== user.id){
      return response.status(500).json({
        message: 'owner ID does not match ID of logged in user'
      });
    }

    Draft.createDraft(request.body)
      .then(draft => {
        if(!draft) {
          console.log('draft not found');
          return response.status(500).json({ message: 'draft not found' });
        }
        else {
          return response.json(draft);
        }
      });
    
  })(request, response, next);
});

router.get('/get/:id', (request, response) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if(err) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: err
      });
    }

    Draft.getDraftById(request.params.id)
      .then(draft => {
        if(user.id != draft['owner_id'])
          return response.status(500).json({
            message: 'owner ID does not match ID of logged in user'
          });
        
        return response.json(draft);
      });
  })(request, response);
});

router.get('/getall/:ownerId', (request, response) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if(err) {
      return response.status(500).json({
        message: 'Something went wrong',
        error: err
      });
    }
    else if(request.params.ownerId != user.id){
      console.log('params:', request.params);
      return response.status(500).json({
        message: 'owner ID does not match ID of logged in user'
      });
    }

    Draft.getAllUserDrafts(request.params.ownerId)
      .then(drafts => response.json(drafts));
  })(request, response);
});

module.exports = router;