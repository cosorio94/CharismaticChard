const express = require('express');
// const middleware = require('../middleware');
const scanner = require('../test/imageProcTest.js');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    scanner();
    res.send('Hey whats up');
  });

module.exports = router;
