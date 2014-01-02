Portfolio.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('/api/' + params.id).then(function (lesson) {
      return Portfolio.Lesson.create(lesson);
    });
  }
})