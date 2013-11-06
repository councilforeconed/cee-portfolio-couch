var db = require('../lib/couch-config');
var ccss = require('../attachments/common-core-data');

// db.view('lessons', 'keys', function (err, body) {
//   body.rows.forEach(function (doc) {
//     db.destroy(doc.value._id, doc.value._rev, function (err, body) {
//       console.log('Success', doc.value._id);
//     })
//   })
// })

db.view('lessons', 'online', function (err, body) {
  body.rows.forEach(function (doc) {
    doc.value.portfolio = true;
    updateLesson(doc.value);
  })
})

function updateLesson(lesson) {
  db.insert(lesson, lesson._id, function (err, body) {
    err ? console.log(err) : console.log('Success: ', body);
  });
}