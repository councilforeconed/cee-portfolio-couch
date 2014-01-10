Portfolio.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('/api/' + params.id).then(function (lesson) {
      return Portfolio.Lesson.create(lesson);
    });
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    var view;
    
    if (model._id.match(/^\w/)) {
      view = '/api/_design/app/_view/feedback?key="' + this.get('id') + '"';
    } else {
      view = '/api/_design/app/_view/feedback?key=' + this.get('id');
    }
    
    Em.$.getJSON(view, function (response) {
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