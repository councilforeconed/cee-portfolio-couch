var db = require('../lib/couch-config');
var ccss = require('../lib/ccss-alignments');

db.view('common-core', 'lessons-with-ccss', function (err, body) {
  body.rows.forEach(function (doc) {
    var lesson = doc.value;
    console.log(lesson);
  });
});

function updateLesson(lesson) {
  db.insert(lesson, lesson._id, function (err, body) {
    err ? console.log(err) : console.log('Success: ', body);
  });
}