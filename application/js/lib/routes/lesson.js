App.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('api/' + params.lesson_id);
  },
  setupController: function(controller, lesson) {
    controller.set('model', lesson);
  },
  renderTemplate:  function(controller, model) {
    this.render('lesson', { into: 'application', controller: controller });
  }
});