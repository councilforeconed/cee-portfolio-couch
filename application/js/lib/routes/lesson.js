App.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/' + params.lesson_id);
  },
  renderTemplate:  function(controller, model) {
    this.render('lesson', { into: 'application' });
  }
});