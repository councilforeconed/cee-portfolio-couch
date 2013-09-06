var db = require('./couch-config');

module.exports = function () {
  db.list(function (err, lessons) {
    lessons.rows.forEach(function (lesson) {
      if (lesson.key.match(/\d+/)) destroyLessons();
    });
  })
}

function destroyLesson(lesson) {
  db.destroy(lesson.id, lesson.value.rev, function (err, lesson) {
    if (err) console.log(err);
    console.log('Lesson destroyed:', lesson);
  });
};