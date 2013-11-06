db = require('../lib/couch-config')

db.view('app', 'dead', function (err, body) {
  body.rows.forEach(function (doc) {
    db.destroy(doc.value._id, doc.value._rev, function (err, body) {
      if (!err) { 
        console.log('Destroyed: ' + doc.value._id);
      } else { 
        console.err(err);
      }
    });
  });
});