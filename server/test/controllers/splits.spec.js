const expect = require('chai').expect;
const Splits = require('../../../db/models/splits.js');
const itemController = require('../../controllers/items.js');
const dbUtils = require('../../../db/lib/utils.js');

describe('Splits model tests', () => {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('should be able to retrieve test data', (done) => {
    Splits.findAll()
      .then(results => {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should be able to update an already existing record', (done) => {
    Splits.update({ total: 15.43 }, { id: 1 })
      .then(result => {
        expect(result.get('total')).to.equal(15.43);
        expect(result.get('split_name')).to.equal('Chipotle meal');
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});