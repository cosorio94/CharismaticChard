const expect = require('chai').expect;
const Items = require('../../../db/models/items.js');
const itemController = require('../../controllers/items.js');
const dbUtils = require('../../../db/lib/utils.js');
const splitData = require('../../../mockData').splitData_1;

describe('Items model tests', () => {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('should be able to retrieve test data', (done) => {
    Items.findAll()
      .then(results => {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      })
  });

  it('should be able to update an already existing record', (done) => {
    Items.update({ price: 15.43 }, { id: 1 })
      .then(result => {
        expect(result.get('price')).to.equal(15.43);
        expect(result.get('item_name')).to.equal('Burrito');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

});

describe('Items controller tests', (done) => {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  var items = [ 
        { "item_name" : "tacos",
          "price" : 15.11,
        },
        { "item_name" : "burrito",
          "price" : 11.00,
        }
      ];

  it('should be able to save a single item', (done) => {
    var item = items[0];
    itemController.saveOneItem(item, 1, 1)
      .then(() => {
        return Items.findOne(item)
      })
      .then(result => {
        expect(result.get('item_name')).to.equal('tacos');
        expect(result.get('price')).to.equal('15.11');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should be able to save multiple items', (done) => {
    itemController.saveItems(items, 1, 1)
      .then(results => {
        expect(results.length).to.equal(2);
        expect(results[1].get('item_name')).to.equal('burrito');
        done();
      })
      .catch(err => {
        done(err);
      });
  });

});