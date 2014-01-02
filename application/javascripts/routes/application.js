Portfolio.ApplicationRoute = Ember.Route.extend({
  model: function () {
    Portfolio.Lessons = Portfolio.LessonCollection.create();
    Portfolio.Lessons.loadLessons();
  }
});