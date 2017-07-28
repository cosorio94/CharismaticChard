const express = require('express');
// const middleware = require('../middleware');
const scanner = require('../test/imageProcTest.js');

const router = express.Router();

router.route('/')
  .get(scanner);
// .get((req, res) => {
//   scanner()
//     .then(data => {
//       console.log('hey')
//       res.send(data);
//     })
//     .error(err => {
//       console.log('ohhh')
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// });

module.exports = router;
