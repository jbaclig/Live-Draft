const express = require('express');
const router = express.Router();

router.get('/profile', function(request, response, next) {
  response.send(request.body.user);
});

module.exports = router;