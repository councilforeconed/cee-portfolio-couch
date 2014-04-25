Portfolio.LessonCollection = Ember.Object.extend({
  loadedLessons: false,
  loadLessons: function() {
    var lessons = this;
    return Em.Deferred.promise(function (p) {
      if (lessons.get('loadedLessons')) {
        // We've already loaded the lessons, let's return them!
        p.resolve(lessons.get('lessons'));
      } else {
        // If we haven't loaded the links, load them via JSON.
        p.resolve($.getJSON('/api/_design/app/_list/resources/content').then(function(response) {
          var collection = Em.A();
          response.forEach(function (lesson) {
            collection.pushObject(Portfolio.Lesson.create(lesson));
          });
          return $.getJSON('/api/_design/app/_list/feedback/feedback-aggregate?group_level=1').then(function(ratings){
            collection.forEach(function (lesson) {
              if (ratings[lesson.get('id')]) {
                lesson.set('rating', ratings[lesson.get('id')]);
              } else {
                lesson.set('rating', 0);
              }
            });
            lessons.setProperties({lessons: collection, loadedLessons: true});
            return collection;
          });
        }));
      }
    });
  }
});