Portfolio.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('/api/' + params.id).then(function (lesson) {
      return Portfolio.Lesson.create(lesson);
    });
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    Em.$.getJSON('/api/_design/app/_view/feedback?key=' + controller.get('id'), function (response) {
      var comments = response.rows.map(function (row) {
        return row.value;
      });
      controller.set('comments', comments);
    });
  },
  actions: {
    willTransition: function () {
      this.controller.set('message', null);
    },
  }
})