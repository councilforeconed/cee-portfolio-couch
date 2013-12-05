var nano = require('nano')('http://' + process.env.COUCHDB_USERNAME + ':' + process.env.COUCHDB_PASSWORD + '@localhost:5984');
var db = nano.db.use('portfolio');

module.exports = db;