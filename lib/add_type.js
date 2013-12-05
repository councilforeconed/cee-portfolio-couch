var db = require('./config');

db.view('app', 'grade', { start_key: '\"\"', end_key: '\"\"' }, function (err, body) {
  body.rows.forEach(function (lesson) {
    lesson.value.grades = [];
    db.insert(lesson.value, lesson.id, function (err, body) {
      console.log("ok");
    });
  })
});