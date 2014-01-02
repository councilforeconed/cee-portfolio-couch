Portfolio.LessonsIndexRoute = Ember.Route.extend({
  model: function(params) {
    return Portfolio.Lessons.loadLessons().then(function (lessons) {
      return lessons;
    });
  },
})