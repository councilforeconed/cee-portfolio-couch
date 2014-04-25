Portfolio.LessonRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON('/api/' + params.id).then(function (lesson) {
      return Portfolio.Lesson.create(lesson);
    });
  },
  setupController: function (controller, model) {
    controller.set('model', model);
    
    var lessonId = controller.get('model._id');
    
    // If the first character is not a number, then wrap it in quotes.
    if (!lessonId.match(/^\d/)) lessonId = '"' + lessonId + '"';
    
    var lessonFeedback = '/api/_design/app/_view/feedback?key=' + lessonId;
    
    console.log(lessonFeedback);
    
    Em.$.getJSON(lessonFeedback).then(function (response) {
      
      console.log(response);
      
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