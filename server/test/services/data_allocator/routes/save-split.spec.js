'use strict';
const expect = require('chai').expect;
const models = require('../../../../../db/models');
const request = require('supertest');
const dbUtils = require('../../../../../db/lib/utils.js');
const splitData = require('../../../../../mockData').splitData_1;
const express = require('express');
const app = require('../../../../app.js');


describe('Save-split route tests', (done) => {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('should save a split on POST request', (done) => {
    request(app)
      .post('/api/data_allocator')
      .send(splitData)
      .expect(307)
      // .end(done);
      .then(() => {
        return models.Split.findOne({ 'split_name': 'Korean BBQ' })
          .then(split => {
            expect(split.get('split_name')).to.equal('Korean BBQ');
            expect(split.get('total')).to.equal('84.32');
            expect(split.get('tax')).to.equal('7.43');
            expect(split.get('tip')).to.equal('11.33');
            expect(split.get('splitter_id')).to.equal(2);
            done();
          });
      })
      .catch(err => {
        done(err);
      });
  });

  it('should save items on POST request', (done) => {
    request(app)
      .post('/api/data_allocator')
      .send(splitData)
      .expect(307)
      // .end(done);
      .then(() => {
        return models.Item.findOne({ 'item_name': 'pizza', price: 10.23 })
          .then(item => {
            expect(item.get('item_name')).to.equal('pizza');
            expect(item.get('price')).to.equal('10.23');
            return models.Item.findOne({ 'item_name': 'tacos', price: 15.00 });
          })
          .then(item => {
            expect(item.get('item_name')).to.equal('tacos');
            expect(item.get('price')).to.equal('15.00');
            return models.Profile.findById(item.get('debtor_id'));
            // done();
          })
          .then(profile => {
            expect(profile.get('first')).to.equal('Carlos');
            expect(profile.get('phone')).to.equal('+14433109844');
            done();
          })
      })
      .catch(err => {
        done(err);
      });
  });

});
