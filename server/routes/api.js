'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).send(req.user);
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/save-split')
  .post((req, res) => {
    res.redirect(307, '/api/data_allocator');
  });

router.route('/send-split')
  .post((req, res) => {
    res.redirect(307, '/api/twilio');
  });

router.route('/split-sent')
  .post((req, res) => {
    res.sendStatus(201);
  });

module.exports = router;
