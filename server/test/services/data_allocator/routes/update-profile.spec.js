'use strict';
const expect = require('chai').expect;
const models = require('../../../../../db/models');
const request = require('supertest');
const dbUtils = require('../../../../../db/lib/utils.js');
const express = require('express');
const app = require('../../../../app.js');

describe('Update-profile route tests', (done) => {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  xit('should update profile info on POST request', (done) => {
    // have to use passport and http mockup or superagent
    // request(app)
    //   .then()
    //   .post('/api/data_allocator')
    //   .send({

    //   })
    //   .expect(307)
    //   // .end(done);
    //   .then(() => {
    //     return models.Split.findOne({ 'split_name': 'Korean BBQ' })
    //       .then(split => {
    //         expect(split.get('split_name')).to.equal('Korean BBQ');
    //         expect(split.get('total')).to.equal('84.32');
    //         expect(split.get('tax')).to.equal('7.43');
    //         expect(split.get('tip')).to.equal('11.33');
    //         expect(split.get('splitter_id')).to.equal(2);
    //         done();
    //       });
    //   })
    //   .catch(err => {
    //     done(err);
    //   });
  });
});