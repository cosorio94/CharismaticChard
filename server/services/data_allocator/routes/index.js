const express = require('express');
// const middleware = require('../middleware');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .post(middleware.deconstructData, (req, res, next) => {
    console.log(req.split);
    res.send(req.split);
  });
// .put
// .update


/************ TEST **********/
// router.route('/')
// .post(deconstructData.deconstructSplitData, (req, res) => {
//   console.log(req.split);
//   res.send(req.split);
// })
// .post(deconstructData.deconstructDebtorsData, (req, res) => {
//   console.log(req.debtors);
//   res.send(req.debtors);
// })
// .post(deconstructData.deconstructDebtorsItemsData, (req, res) => {
//   console.log(req.debtorItems);
//   res.send(req.debtorItems);
// })
// .post(deconstructData.deconstructSplitterItems, (req, res) => {
//   console.log(req.splitter);
//   res.send(req.splitter);
// })
// .get((req, res) => {
//   console.log('request received!');
//   res.end();
// });

module.exports = router;

