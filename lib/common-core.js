var data = require('./common-core-data');
var _ = require('lodash');

module.exports = function (id) {
  return _.find(data, function (standard) {
    return standard.id === id;
  });
}