const express = require('express');
const middleware = require('../middleware');
const scanner = require('../test/imageProcTest.js');

const router = express.Router();

router.route('/')
  .post(middleware.deconstructImage)
  .post(middleware.filterImageResponse)
  .post(middleware.deconstructLines);

module.exports = router;
