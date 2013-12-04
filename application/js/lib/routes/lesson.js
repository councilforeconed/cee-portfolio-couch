App.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/' + params.lesson_id);
  }
});