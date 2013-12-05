Portfolio.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Portfolio.Lessons.lesson(params.lesson_id);
  }
});