Portfolio.LessonsIndexRoute = Ember.Route.extend({
  model: function(params) {
    return Portfolio.Lessons.loadLessons().then(function (lessons) {
      return lessons;
    });
  },
  setupController: function (controller, model) {
    controller.set('model', _.sortBy(model, function (lesson) {
      return lesson.get('rating') * -1;
    }));
  }
});